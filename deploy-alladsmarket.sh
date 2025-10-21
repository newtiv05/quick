#!/bin/bash

# AllAdsMarket.com Deployment Script
echo "🚀 Deploying AllAdsMarket.com..."

# Set environment variables
export NODE_ENV=production
export VITE_DOMAIN=alladsmarket.com
export VITE_API_URL=https://alladsmarket.com
export VITE_SITE_URL=https://alladsmarket.com

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/
rm -rf node_modules/.vite/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production

# Build for production
echo "🔨 Building for production..."
npm run build

# Verify build
echo "✅ Verifying build..."
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    echo "📁 Build directory: $(pwd)/dist"
    echo "🌐 Ready for deployment to alladsmarket.com"
else
    echo "❌ Build failed!"
    exit 1
fi

# Create deployment package
echo "📦 Creating deployment package..."
tar -czf alladsmarket-deployment.tar.gz dist/

echo "🎉 Deployment package ready: alladsmarket-deployment.tar.gz"
echo "🌐 Upload to alladsmarket.com server to complete deployment"
