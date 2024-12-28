const next = require('next')
const path = require('path')
const { ServerResponse, IncomingMessage } = require('http')

const app = next({
  dev: false,
  dir: path.join(__dirname),
  conf: require('./next.config.js')
})

const handle = app.getRequestHandler()

let isAppPrepared = false

exports.handler = async (event, context) => {
  try {
    if (!isAppPrepared) {
      await app.prepare()
      isAppPrepared = true
    }

    const { httpMethod, path: pathname, headers, queryStringParameters, body, isBase64Encoded } = event
    
    // Construct URL
    const url = pathname + (queryStringParameters ? '?' + new URLSearchParams(queryStringParameters).toString() : '')

    return new Promise((resolve, reject) => {
      // Create mock request object using http.IncomingMessage
      const req = Object.assign(new IncomingMessage(), {
        method: httpMethod,
        url,
        headers: headers || {},
        body: body ? (isBase64Encoded ? Buffer.from(body, 'base64').toString() : body) : undefined
      })

      // Create mock response object using http.ServerResponse
      const res = Object.assign(new ServerResponse(req), {
        finished: false,
        _body: '',
        end: function(chunk) {
          ServerResponse.prototype.end.call(this, chunk)
          resolve({
            statusCode: this.statusCode,
            headers: this.getHeaders(),
            body: this._body || chunk || '',
            isBase64Encoded: false
          })
        },
        write: function(chunk) {
          this._body = this._body || ''
          this._body += chunk.toString('utf8')
        }
      })

      // Add required methods for Next.js compatibility
      res.send = function(body) {
        if (typeof body === 'string') {
          this.setHeader('Content-Type', 'text/html')
          this.end(body)
        } else if (Buffer.isBuffer(body)) {
          this.setHeader('Content-Type', 'application/octet-stream')
          this.end(body)
        } else {
          this.setHeader('Content-Type', 'application/json')
          this.end(JSON.stringify(body))
        }
      }

      res.json = function(obj) {
        this.setHeader('Content-Type', 'application/json')
        this.end(JSON.stringify(obj))
      }

      res.status = function(code) {
        this.statusCode = code
        return this
      }

      res.redirect = function(status, url) {
        if (typeof url === 'undefined') {
          url = status
          status = 302
        }
        this.statusCode = status
        this.setHeader('Location', url)
        this.end()
      }

      // Handle the request
      handle(req, res).catch(reject)
    })

  } catch (error) {
    console.error('Error:', error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Internal Server Error',
        details: error.message,
        stack: error.stack
      }),
      isBase64Encoded: false
    }
  }
} 
