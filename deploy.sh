#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Install CDK dependencies
echo "📦 Installing CDK dependencies..."
npm install

# Bootstrap CDK (only needs to be done once per account/region)
echo "🏗️ Bootstrapping CDK..."
npx cdk bootstrap

# Build and prepare the package
echo "🏗️ Building and preparing package..."
bash ./prepare-lambda.sh

# Deploy with CDK
echo "🚀 Deploying with CDK..."
npx cdk deploy --require-approval never

echo "✅ Deployment completed successfully!"
