import { FC } from 'react'
import Button from '../components/Button'
import Head from 'next/head'

interface Feature {
  title: string
  description: string
  icon: string
}
// Static data to avoid server calls
const features: Feature[] = [
  {
    title: 'Serverless Architecture',
    description: 'Built on AWS Lambda for server-side rendering with S3 for static assets.',
    icon: '☁️'
  },
  {
    title: 'Optimized Performance',
    description: 'Static files served directly from S3 for faster page loads.',
    icon: '⚡'
  },
  {
    title: 'Infrastructure as Code',
    description: 'Deployed using AWS CDK for reliable and repeatable infrastructure.',
    icon: '🏗️'
  }
]

const techStack = [
  {
    name: 'AWS Lambda',
    description: 'Server-side rendering of Next.js pages.',
    icon: '🔥'
  },
  {
    name: 'Amazon S3',
    description: 'High-performance static asset delivery.',
    icon: '🚀'
  },
  {
    name: 'Next.js',
    description: 'React framework with hybrid static & server rendering.',
    icon: '📱'
  },
  {
    name: 'TypeScript',
    description: 'Type-safe development for better code quality.',
    icon: '🛡️'
  },
  {
    name: 'API Gateway',
    description: 'Request routing and API management.',
    icon: '🌐'
  },
  {
    name: 'CloudFormation',
    description: 'Infrastructure deployment via CDK.',
    icon: '☁️'
  }
]

// Use getStaticProps to pre-render at build time
export const getStaticProps = async () => {
  return {
    props: {
      buildTime: new Date().toISOString(),
    },
    // Revalidate every hour
    revalidate: 3600
  }
}

interface HomeProps {
  buildTime: string;
}

const Home: FC<HomeProps> = ({ buildTime }) => {
  return (
    <>
      <Head>
        <title>Serverless Next.js on AWS Lambda + S3</title>
        <meta name="description" content="Next.js application with Lambda SSR and S3 static assets" />
        <link rel="icon" href="/_next/static/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 z-0" />
          <div className="container mx-auto px-4 z-10">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-fade-in">
                Serverless Next.js
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Experience Next.js with Lambda SSR and S3 static asset delivery.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={() => window.open('https://github.com/iman-suherman/nextjs-lambda-cdk', '_blank')}
                >
                  View on GitHub
                </Button>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="bg-purple-500 hover:bg-purple-600"
                  onClick={() => window.open('https://github.com/iman-suherman/nextjs-lambda-cdk/blob/main/README.md', '_blank')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Optimized Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-2xl bg-gray-900 hover:bg-gray-700 transition-all duration-300"
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{tech.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{tech.name}</h3>
                  <p className="text-gray-300">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-white">Ready to Go Serverless?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
              Deploy your Next.js applications with optimized asset delivery using Lambda and S3.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-gray-800 text-gray-300 hover:bg-gray-700"
              onClick={() => window.open('https://github.com/iman-suherman/nextjs-lambda-cdk/blob/main/README.md', '_blank')}
            >
              Get Started
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-black text-gray-300">
          <div className="container mx-auto px-4">
            <div className="text-center text-gray-400">
              <p>
                © 2024 by{' '}
                <a 
                  href="https://github.com/iman-suherman" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Iman Suherman
                </a>
                . Built with Lambda SSR and S3 static assets.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Last built: {buildTime}
              </p>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}

export default Home