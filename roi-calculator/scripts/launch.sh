#!/bin/bash

# ROI Calculator Pro - Complete Launch Script
# This script handles everything from setup to deployment

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ASCII Art Header
echo -e "${CYAN}"
cat << "EOF"
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                    🚀 ROI CALCULATOR PRO LAUNCHER 🚀                        ║
║                                                                              ║
║                        Professional Business Application                     ║
║                                Version 1.0.0                                ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# Functions for colored output
success() { echo -e "${GREEN}✅ $1${NC}"; }
info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; }
header() { echo -e "${PURPLE}🔥 $1${NC}"; }

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    error "package.json not found. Please run this script from the project root."
    exit 1
fi

header "Welcome to ROI Calculator Pro Launch Assistant!"
echo ""
info "This script will help you:"
info "1. 🔧 Set up the development environment"
info "2. 🧪 Run comprehensive tests and verification"
info "3. 🏗️  Build the production application"
info "4. 🚀 Deploy to your chosen platform"
echo ""

# Menu for user choice
echo "Please select your launch option:"
echo ""
echo "1) 🏃 Quick Development Setup (60 seconds)"
echo "2) 🧪 Full Testing & Verification"
echo "3) 🏗️  Production Build & Optimization"
echo "4) 🚀 Deploy to Vercel"
echo "5) 🐳 Deploy with Docker"
echo "6) 📊 Complete Launch Pipeline (All Steps)"
echo "7) 🆘 Help & Documentation"
echo ""

read -p "Enter your choice (1-7): " choice

case $choice in
    1)
        header "🏃 Quick Development Setup"
        ;;
    2)
        header "🧪 Full Testing & Verification"
        ;;
    3)
        header "🏗️  Production Build & Optimization"
        ;;
    4)
        header "🚀 Deploy to Vercel"
        ;;
    5)
        header "🐳 Deploy with Docker"
        ;;
    6)
        header "📊 Complete Launch Pipeline"
        ;;
    7)
        header "🆘 Help & Documentation"
        ;;
    *)
        error "Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""

# Function to install dependencies
install_dependencies() {
    info "Installing dependencies..."
    if [ ! -d "node_modules" ]; then
        npm install --legacy-peer-deps
        success "Dependencies installed successfully"
    else
        success "Dependencies already installed"
    fi
}

# Function to set up environment
setup_environment() {
    info "Setting up environment..."
    if [ ! -f ".env.local" ]; then
        cp .env .env.local
        warning "Please edit .env.local with your configuration"
        warning "Database URL, JWT secrets, etc."
    else
        success "Environment file already exists"
    fi
}

# Function to run verification
run_verification() {
    info "Running comprehensive verification..."
    node scripts/verify-deployment.js
    if [ $? -eq 0 ]; then
        success "All verification tests passed! 🎉"
    else
        error "Verification failed. Please check the issues above."
        exit 1
    fi
}

# Function to build production
build_production() {
    info "Building production application..."
    npm run build
    if [ $? -eq 0 ]; then
        success "Production build completed successfully!"
        
        # Show build statistics
        if [ -d ".next" ]; then
            info "Build statistics:"
            du -sh .next
        fi
    else
        error "Production build failed. Please check the errors above."
        exit 1
    fi
}

# Function to deploy to Vercel
deploy_vercel() {
    info "Preparing Vercel deployment..."
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        info "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    warning "Make sure you have:"
    warning "1. Logged in to Vercel (run 'vercel login' if needed)"
    warning "2. Set up environment variables in Vercel dashboard"
    warning "3. Configured your database connection"
    echo ""
    
    read -p "Are you ready to deploy to Vercel? (y/N): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        vercel --prod
        if [ $? -eq 0 ]; then
            success "🎉 Vercel deployment successful!"
        else
            error "Vercel deployment failed."
            exit 1
        fi
    else
        info "Vercel deployment cancelled."
    fi
}

# Function to deploy with Docker
deploy_docker() {
    info "Preparing Docker deployment..."
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    
    info "Building Docker image..."
    docker build -t roi-calculator:latest .
    
    if [ $? -eq 0 ]; then
        success "Docker image built successfully!"
        
        info "Starting Docker container..."
        docker run -d -p 3000:3000 --name roi-calculator-app roi-calculator:latest
        
        if [ $? -eq 0 ]; then
            success "🎉 Docker deployment successful!"
            info "Application is running at http://localhost:3000"
            info "To stop: docker stop roi-calculator-app"
            info "To remove: docker rm roi-calculator-app"
        else
            error "Failed to start Docker container."
            exit 1
        fi
    else
        error "Docker build failed."
        exit 1
    fi
}

# Function to show help
show_help() {
    info "📚 ROI Calculator Pro Documentation"
    echo ""
    echo "Available documentation files:"
    echo "• README.md - Complete setup and overview"
    echo "• QUICK_START.md - 60-second launch guide"
    echo "• DEPLOYMENT.md - Detailed deployment instructions"
    echo "• PRODUCTION_CHECKLIST.md - Pre-launch checklist"
    echo "• TESTING.md - Testing procedures"
    echo "• MAINTENANCE.md - Operations and monitoring"
    echo ""
    echo "Quick commands:"
    echo "• npm run dev - Start development server"
    echo "• npm run build - Build for production"
    echo "• npm run start - Start production server"
    echo "• node scripts/verify-deployment.js - Run verification"
    echo ""
    echo "Deployment options:"
    echo "• ./scripts/deploy-vercel.sh - Deploy to Vercel"
    echo "• docker-compose up - Start with Docker Compose"
    echo ""
    info "For detailed help, check the documentation files above."
}

# Execute based on user choice
case $choice in
    1)
        install_dependencies
        setup_environment
        info "Generating Prisma client..."
        npx prisma generate || warning "Prisma generation failed (database not configured)"
        info "Starting development server..."
        success "🎉 Setup complete! Starting development server..."
        npm run dev
        ;;
    2)
        install_dependencies
        run_verification
        success "🎉 All tests passed! Your application is ready for deployment."
        ;;
    3)
        install_dependencies
        run_verification
        build_production
        success "🎉 Production build complete! Ready for deployment."
        ;;
    4)
        install_dependencies
        run_verification
        build_production
        deploy_vercel
        ;;
    5)
        install_dependencies
        run_verification
        build_production
        deploy_docker
        ;;
    6)
        header "🚀 Complete Launch Pipeline - All Steps"
        echo ""
        info "Step 1/5: Installing dependencies..."
        install_dependencies
        echo ""
        info "Step 2/5: Setting up environment..."
        setup_environment
        echo ""
        info "Step 3/5: Running verification..."
        run_verification
        echo ""
        info "Step 4/5: Building for production..."
        build_production
        echo ""
        info "Step 5/5: Choose deployment method..."
        echo ""
        echo "Select deployment platform:"
        echo "1) Vercel (Recommended)"
        echo "2) Docker"
        echo "3) Manual (build only)"
        echo ""
        read -p "Enter choice (1-3): " deploy_choice
        
        case $deploy_choice in
            1) deploy_vercel ;;
            2) deploy_docker ;;
            3) success "Build complete! Deploy manually using your preferred method." ;;
            *) warning "Invalid choice. Build complete, deploy manually." ;;
        esac
        
        header "🎊 LAUNCH COMPLETE!"
        success "ROI Calculator Pro is ready for the world!"
        ;;
    7)
        show_help
        ;;
esac

echo ""
header "🎉 Launch Process Complete!"
echo ""
success "Your ROI Calculator Pro features:"
success "• 77 Business Types across 11 industries"
success "• 539 Detailed scenarios with real-world data"
success "• 26 Countries with 2025 tax rates"
success "• Professional PDF export"
success "• Mobile-responsive design"
success "• Enterprise security"
success "• Admin dashboard"
success "• Interactive charts"
echo ""
info "Next steps:"
info "1. Test your application thoroughly"
info "2. Set up monitoring and analytics"
info "3. Configure custom domain (if needed)"
info "4. Launch your marketing campaign"
info "5. Start serving customers worldwide!"
echo ""
header "🚀 Welcome to the future of ROI calculation! 🚀"