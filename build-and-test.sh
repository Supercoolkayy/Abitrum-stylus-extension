#!/bin/bash

echo "┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓"
echo "┃  Arbitrum Stylus Extension - Build & Test    ┃"
echo "┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[OK]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERR]${NC} $1"
}

# Step 1: Check prerequisites
print_status "Checking prerequisites..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi

print_success "Prerequisites check passed"

# Step 2: Install dependencies
print_status "Installing dependencies..."
if npm install; then
    print_success "Dependencies installed"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Step 3: Compile TypeScript
print_status "Compiling TypeScript..."
if npm run compile; then
    print_success "TypeScript compilation successful"
else
    print_error "TypeScript compilation failed"
    exit 1
fi

# Step 4: Verify compiled output
print_status "Verifying compiled output..."
if [ -f "out/extension.js" ]; then
    print_success "Extension entry point found: out/extension.js"
else
    print_error "Extension entry point missing: out/extension.js"
    exit 1
fi

# Step 5: Run robust packaging
print_status "Running robust packaging..."
if node package-robust.js; then
    print_success "Robust packaging completed"
else
    print_error "Robust packaging failed"
    exit 1
fi

# Step 6: Test vsce packaging
print_status "Testing vsce packaging..."
if command -v vsce &> /dev/null; then
    if vsce package; then
        print_success "VSIX package created successfully"
        ls -la *.vsix
    else
        print_warning "vsce packaging failed (this is optional)"
    fi
else
    print_warning "vsce not installed. Install with: npm install -g @vscode/vsce"
fi

# Step 7: Create VS Code extensions directory
print_status "Creating VS Code extensions directory..."
mkdir -p ~/.vscode/extensions
print_success "VS Code extensions directory ready"

# Step 8: Install extension for testing
print_status "Installing extension for testing..."
if [ -d "arbitrum-stylus-extension" ]; then
    cp -r arbitrum-stylus-extension ~/.vscode/extensions/
    print_success "Extension installed to ~/.vscode/extensions/"
else
    print_error "Extension package not found"
    exit 1
fi

# Step 9: Verify installation
print_status "Verifying installation..."
if [ -d "~/.vscode/extensions/arbitrum-stylus-extension" ]; then
    print_success "Extension verified in VS Code extensions directory"
else
    print_warning "Extension not found in expected location"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo " BUILD AND TEST COMPLETE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
print_success "Extension is ready for testing!"
echo ""
echo "Next steps:"
echo "1. Restart VS Code"
echo "2. Open any .rs file"
echo "3. Type 'stylus-' to see snippets"
echo "4. Use Ctrl+Space for completions"
echo ""
echo "Files created:"
echo "- arbitrum-stylus-extension/ (development package)"
echo "- arbitrum-stylus-0.1.0/ (VSIX-ready package)"
if [ -f "arbitrum-stylus-0.1.0.vsix" ]; then
    echo "- arbitrum-stylus-0.1.0.vsix (VSIX package)"
fi
echo ""
echo "Installation location:"
echo "- ~/.vscode/extensions/arbitrum-stylus-extension/"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" 