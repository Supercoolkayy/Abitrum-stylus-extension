#!/bin/bash

echo "Cleaning up redundant files..."

# Remove the redundant VSIX directory since we have the .vsix file
if [ -d "arbitrum-stylus-0.1.0" ]; then
    rm -rf arbitrum-stylus-0.1.0
    echo "[OK] Removed arbitrum-stylus-0.1.0/ directory (redundant)"
else
    echo "[INFO] arbitrum-stylus-0.1.0/ directory not found"
fi

echo ""
echo "[DIR] Current structure:"
echo "- arbitrum-stylus-extension/ (development package)"
echo "- arbitrum-stylus-0.1.0.vsix (VSIX package - ready for distribution)"
echo ""
echo "[TARGET] You now have:"
echo "1. Development package for testing"
echo "2. VSIX file for distribution"
echo ""
echo "[OK] Cleanup complete!" 