#!/bin/bash

# ROI Calculator Pro - Vercel Deployment Script
# This script automates the deployment process to Vercel

echo "🚀 ROI Calculator Pro - Vercel Deployment"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_status "Starting deployment process..."

# Step 1: Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --legacy-peer-deps
    if [ $? -ne 0 ]; then
        print_error "Failed to install dependencies"
        exit 1
    fi
    print_status "Dependencies installed"
else
    print_status "Dependencies already installed"
fi

# Step 2: Run verification script
echo "🔍 Running pre-deployment verification..."
node scripts/verify-deployment.js
if [ $? -ne 0 ]; then
    print_error "Verification failed. Please fix the issues before deploying."
    exit 1
fi
print_status "Verification passed"

# Step 3: Build the application
echo "🏗️  Building application..."
npm run build
if [ $? -ne 0 ]; then
    print_error "Build failed. Please fix the build errors."
    exit 1
fi
print_status "Build completed successfully"

# Step 4: Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        print_error "Failed to install Vercel CLI"
        exit 1
    fi
    print_status "Vercel CLI installed"
fi

# Step 5: Deploy to Vercel
echo "🚀 Deploying to Vercel..."
echo ""
print_warning "Make sure you have:"
print_warning "1. Logged in to Vercel (run 'vercel login' if needed)"
print_warning "2. Set up your environment variables in the Vercel dashboard"
print_warning "3. Configured your database connection"
echo ""

read -p "Are you ready to deploy? (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    vercel --prod
    
    if [ $? -eq 0 ]; then
        echo ""
        print_status "🎉 Deployment successful!"
        echo ""
        echo "Next steps:"
        echo "1. ✅ Verify your application is working at the provided URL"
        echo "2. ✅ Set up monitoring and analytics"
        echo "3. ✅ Configure your custom domain (optional)"
        echo "4. ✅ Set up automated backups"
        echo "5. ✅ Celebrate your successful launch! 🎊"
        echo ""
        echo "📚 Documentation:"
        echo "- README.md - Setup and overview"
        echo "- DEPLOYMENT.md - Detailed deployment guide"
        echo "- MAINTENANCE.md - Operations and monitoring"
        echo "- PRODUCTION_CHECKLIST.md - Production checklist"
        echo ""
        echo "🎯 Your ROI Calculator Pro is now live!"
    else
        print_error "Deployment failed. Please check the error messages above."
        exit 1
    fi
else
    echo "Deployment cancelled."
    echo ""
    echo "When you're ready to deploy:"
    echo "1. Run 'vercel login' to authenticate"
    echo "2. Set up environment variables in Vercel dashboard"
    echo "3. Run this script again"
    exit 0
fi