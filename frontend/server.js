const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Writable } = require('stream')
const { EventEmitter } = require('events')
const http = require('http')

// Global error handler
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error)
})

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
})

const dev = process.env.NODE_ENV !== 'production'
const STATIC_BUCKET_NAME = process.env.STATIC_BUCKET_NAME
const S3_DOMAIN = `https://${STATIC_BUCKET_NAME}.s3.ap-southeast-3.amazonaws.com`

console.log('Environment:', {
  dev,
  nodeEnv: process.env.NODE_ENV,
  region: process.env.AWS_REGION,
  staticBucket: STATIC_BUCKET_NAME,
  s3Domain: S3_DOMAIN
})

let app
try {
  app = next({ 
    dev,
    conf: {
      output: 'standalone',
      assetPrefix: '',
      compress: false,
      images: {
        unoptimized: true,
      },
      experimental: {
        appDir: false,
      }
    }
  })
  console.log('Next.js app created')
} catch (error) {
  console.error('Failed to create Next.js app:', error)
  throw error
}

let handle
try {
  handle = app.getRequestHandler()
  console.log('Got request handler')
} catch (error) {
  console.error('Failed to get request handler:', error)
  throw error
}

class ServerResponse extends http.ServerResponse {
  constructor(req) {
    super(req)
    this._body = ''
    this.req = req
  }

  write(chunk, encoding) {
    if (chunk) {
      this._body += chunk.toString(encoding)
    }
    return true
  }

  end(chunk, encoding) {
    if (chunk) {
      this.write(chunk, encoding)
    }
    this.emit('finish')
    return this
  }
}

class ServerRequest extends http.IncomingMessage {
  constructor(event) {
    super({
      encrypted: true,
      readable: true,
      remoteAddress: event.requestContext?.identity?.sourceIp || '127.0.0.1',
      address: () => ({ port: 443 }),
      end: () => {},
      destroy: () => {}
    })

    this.method = event.httpMethod
    this.url = event.path + (event.queryStringParameters ? 
      '?' + new URLSearchParams(event.queryStringParameters).toString() : '')
    this.headers = {
      ...event.headers,
      'x-forwarded-proto': 'https',
      host: event.requestContext?.domainName || event.headers?.Host
    }
  }
}

exports.handler = async (event) => {
  console.log('Handler started:', { 
    path: event.path,
    method: event.httpMethod,
    headers: event.headers 
  })

  try {
    await app.prepare()
    console.log('App prepared')

    const response = await new Promise((resolve, reject) => {
      const req = new ServerRequest(event)
      const res = new ServerResponse(req)

      res.on('finish', () => {
        console.log('Response finished:', {
          statusCode: res.statusCode,
          hasBody: !!res._body,
          bodyLength: res._body.length
        })
        
        resolve({
          statusCode: res.statusCode || 200,
          headers: {
            ...res.getHeaders(),
            'Content-Type': res.getHeader('content-type') || 'text/html',
            'Access-Control-Allow-Origin': '*'
          },
          body: res._body
        })
      })

      res.on('error', (error) => {
        console.error('Response error:', error)
        reject(error)
      })

      try {
        handle(req, res)
      } catch (error) {
        console.error('Handler error:', error)
        reject(error)
      }
    })

    // Global replacement for all /_next occurrences
    response.body = response.body.replace(
      /\/_next\//g,
      `${S3_DOMAIN}/_next/`
    );

    console.log('Returning response:', {
      statusCode: response.statusCode,
      hasBody: !!response.body,
      body: response.body,
      bodyLength: response.body?.length
    })

    return response

  } catch (error) {
    console.error('Top level error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    })

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: true,
        message: error.message,
        name: error.name,
        stack: error.stack
      })
    }
  }
} 
