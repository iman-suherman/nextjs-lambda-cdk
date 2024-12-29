#!/bin/bash

# Exit on error
set -e

echo "🚀 Preparing Lambda package..."

# Create the Lambda package directory
rm -rf .lambda-package
mkdir -p .lambda-package

# Build Next.js first
echo "🏗️ Building Next.js..."
cd frontend
# Clean install dependencies
rm -rf node_modules .next
npm install
NODE_ENV=production npm run build
cd ..

# Verify standalone output exists
if [ ! -d "frontend/.next/standalone" ]; then
    echo "❌ Error: standalone build not found. Ensure next.config.js has output: 'standalone'"
    exit 1
fi

# Copy necessary files
echo "📦 Copying build files..."
cp -r frontend/.next/standalone/* .lambda-package/

# Create and copy .next directory structure
mkdir -p .lambda-package/.next
cp -r frontend/.next/BUILD_ID .lambda-package/.next/
cp -r frontend/.next/build-manifest.json .lambda-package/.next/
cp -r frontend/.next/prerender-manifest.json .lambda-package/.next/
cp -r frontend/.next/required-server-files.json .lambda-package/.next/
cp -r frontend/.next/routes-manifest.json .lambda-package/.next/
cp -r frontend/.next/server .lambda-package/.next/
cp -r frontend/.next/static .lambda-package/.next/
cp -r frontend/.next/standalone/.next/* .lambda-package/.next/ || true

# Copy public assets
cp -r frontend/public .lambda-package/
cp frontend/server.js .lambda-package/
cp frontend/next.config.js .lambda-package/

# Debug: List contents
echo "📦 Listing .lambda-package contents:"
ls -la .lambda-package
echo "📦 Listing .lambda-package/.next contents:"
ls -la .lambda-package/.next

# Install production dependencies
echo "📦 Installing production dependencies..."
cd .lambda-package
npm install --omit=dev --no-audit --no-fund --omit=optional

# Clean up unnecessary files
echo "🧹 Cleaning up..."
rm -rf node_modules/.cache
find . -type f -name "*.map" -delete

# List package size
echo "📦 Package size:"
du -sh .

cd ..

echo "✅ Lambda package prepared successfully!" 