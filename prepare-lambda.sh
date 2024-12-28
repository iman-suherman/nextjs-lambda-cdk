#!/bin/bash

# Exit on error
set -e

echo "🚀 Preparing Lambda package..."

# Create temporary directory
rm -rf .lambda-package
mkdir -p .lambda-package

# Build Next.js first
echo "🏗️ Building Next.js..."
cd frontend
# Clean install dependencies
rm -rf node_modules .next
npm install
npm run build
cd ..

# Debug: List frontend/.next contents
echo "📦 Listing frontend/.next contents:"
ls -la frontend/.next/

# Copy Next.js build output
echo "📦 Copying Next.js build..."
mkdir -p .lambda-package/.next
cp -r frontend/.next/* .lambda-package/.next/
cp -r frontend/node_modules .lambda-package/
cp -r frontend/public .lambda-package/
cp frontend/next.config.js .lambda-package/
cp frontend/package.json .lambda-package/
cp frontend/server.js .lambda-package/

# Debug: List .lambda-package/.next contents
echo "📦 Listing .lambda-package/.next contents:"
ls -la .lambda-package/.next/

# Install production dependencies in the package
echo "📦 Installing production dependencies..."
cd .lambda-package
npm install --production --no-audit --no-fund --no-optional

# Remove unnecessary files
echo "🧹 Cleaning up..."
rm -rf node_modules/.cache
find . -type f -name "*.map" -delete
find . -type f -name "*.ts" -delete
find . -type f -name "*.tsx" -delete

# List package size
echo "📦 Package size:"
du -sh .

cd ..

echo "✅ Lambda package prepared successfully!" 