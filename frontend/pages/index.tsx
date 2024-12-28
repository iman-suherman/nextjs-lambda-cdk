import { FC } from 'react'
import Button from '../components/Button'
import Head from 'next/head'

interface Feature {
  title: string
  description: string
  icon: string
}

const features: Feature[] = [
  {
    title: 'Serverless Architecture',
    description: 'Built on AWS Lambda for automatic scaling and cost-effective hosting.',
    icon: '☁️'
  },
  {
    title: 'Infrastructure as Code',
    description: 'Deployed using AWS CDK for reliable and repeatable infrastructure.',
    icon: '🏗️'
  },
  {
    title: 'Next.js Framework',
    description: 'Modern React framework with server-side rendering capabilities.',
    icon: '⚡'
  }
]

const techStack = [
  {
    name: 'AWS Lambda',
    description: 'Serverless compute service that runs your code in response to events.',
    icon: '🔥'
  },
  {
    name: 'AWS CDK',
    description: 'Infrastructure as code using familiar programming languages.',
    icon: '🚀'
  },
  {
    name: 'Next.js',
    description: 'React framework for production-grade applications.',
    icon: '📱'
  },
  {
    name: 'TypeScript',
    description: 'Type-safe development for better code quality.',
    icon: '🛡️'
  },
  {
    name: 'API Gateway',
    description: 'Managed API service for serverless applications.',
    icon: '🌐'
  },
  {
    name: 'CloudFormation',
    description: 'Infrastructure deployment and management service.',
    icon: '☁️'
  }
]

const Home: FC = () => {
  return (
    <>
      <Head>
        <title>Serverless Next.js on AWS Lambda</title>
        <meta name="description" content="Next.js application running on AWS Lambda, deployed with CDK" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 z-0" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] z-0" />
          <div className="container mx-auto px-4 z-10">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 animate-fade-in">
                Serverless Next.js
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Experience the power of Next.js running completely serverless on AWS Lambda, deployed with CDK.
              </p>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-blue-500 hover:bg-blue-600">View on GitHub</Button>
                <Button variant="secondary" size="lg" className="bg-purple-500 hover:bg-purple-600">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-white">Serverless Architecture</h2>
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
              Deploy your Next.js applications on AWS Lambda with infrastructure as code using CDK.
            </p>
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100"
            >
              Get Started
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-black text-gray-300">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Documentation</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-blue-400">Getting Started</a></li>
                  <li><a href="#" className="hover:text-blue-400">Architecture</a></li>
                  <li><a href="#" className="hover:text-blue-400">Deployment</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-blue-400">AWS Lambda</a></li>
                  <li><a href="#" className="hover:text-blue-400">AWS CDK</a></li>
                  <li><a href="#" className="hover:text-blue-400">Next.js</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Community</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-blue-400">GitHub</a></li>
                  <li><a href="#" className="hover:text-blue-400">Discord</a></li>
                  <li><a href="#" className="hover:text-blue-400">Twitter</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-white">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
                  <li><a href="#" className="hover:text-blue-400">Terms</a></li>
                  <li><a href="#" className="hover:text-blue-400">License</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
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
                . Built with AWS Lambda and CDK.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home