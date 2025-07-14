const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓");
console.log("┃  Arbitrum Stylus Extension - Milestone 1     ┃");
console.log("┃  Development Packaging Script                ┃");
console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n");

// Step 1: Ensure compilation
console.log("Step 1: Compiling TypeScript...");
try {
  // Try npx first, then fallback to direct path
  try {
    execSync("npx tsc -p ./", { stdio: "inherit" });
  } catch (npxError) {
    console.log("  [INFO] npx failed, trying direct path...");
    execSync("node_modules/.bin/tsc -p ./", { stdio: "inherit" });
  }
  console.log("  [OK]   TypeScript compilation successful");
} catch (error) {
  console.log("  [ERR]  TypeScript compilation failed");
  console.log("  [INFO] Error details:", error.message);
  process.exit(1);
}

// Step 2: Verify critical files exist
console.log("\nStep 2: Verifying critical files...");
const criticalFiles = [
  "out/extension.js",
  "definitions/syntaxes/stylus-rust.tmLanguage.json",
  "definitions/snippets/stylus-rust.json",
  "language-configuration.json",
  "package.json",
];

let allFilesExist = true;
criticalFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`  [OK]   Found: ${file}`);
  } else {
    console.log(`  [ERR]  Missing: ${file}`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log(
    "  [ERR]  Critical files missing. Cannot proceed with packaging."
  );
  process.exit(1);
}

// Step 3: Create extension directory structure
console.log("\nStep 3: Creating extension package structure...");
const extensionDir = "arbitrum-stylus-extension";

// Clean up previous build
if (fs.existsSync(extensionDir)) {
  fs.rmSync(extensionDir, { recursive: true });
}

// Create directory structure
fs.mkdirSync(extensionDir, { recursive: true });
fs.mkdirSync(path.join(extensionDir, "out"), { recursive: true });
fs.mkdirSync(path.join(extensionDir, "definitions/syntaxes"), {
  recursive: true,
});
fs.mkdirSync(path.join(extensionDir, "definitions/snippets"), {
  recursive: true,
});

// Define files to copy with proper source paths
const filesToCopy = [
  // Compiled extension files
  { src: "out/extension.js", dest: "out/extension.js" },
  { src: "out/extension.js.map", dest: "out/extension.js.map" },

  // Test files (only if they exist)
  // Note: Test files removed for Milestone 1 simplicity

  // Language definitions
  {
    src: "definitions/syntaxes/stylus-rust.tmLanguage.json",
    dest: "definitions/syntaxes/stylus-rust.tmLanguage.json",
  },
  {
    src: "definitions/snippets/stylus-rust.json",
    dest: "definitions/snippets/stylus-rust.json",
  },

  // Configuration files
  { src: "language-configuration.json", dest: "language-configuration.json" },
  { src: "package.json", dest: "package.json" },

  // Documentation files (only if they exist)
  { src: "README.md", dest: "README.md", optional: true },
  { src: "CHANGELOG.md", dest: "CHANGELOG.md", optional: true },
];

// Copy files
filesToCopy.forEach(({ src, dest, optional = false }) => {
  if (fs.existsSync(src)) {
    const destPath = path.join(extensionDir, dest);
    const destDir = path.dirname(destPath);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    try {
      fs.copyFileSync(src, destPath);
      console.log(`  [OK]   Copied: ${src} → ${dest}`);
    } catch (error) {
      console.log(`  [WARN] Failed to copy: ${src} - ${error.message}`);
    }
  } else if (optional) {
    console.log(`  [INFO] Skipped optional file: ${src}`);
  } else {
    console.log(`  [WARN] Missing required file: ${src}`);
  }
});

// Step 4: Create installation instructions
console.log("\nStep 4: Creating installation instructions...");
const installInstructions = `# Arbitrum Stylus Extension - Manual Installation

## For Development/Testing:
1. Copy the 'arbitrum-stylus-extension' folder to your VS Code extensions directory:
   - Windows: %USERPROFILE%\\.vscode\\extensions\\
   - macOS: ~/.vscode/extensions/
   - Linux: ~/.vscode/extensions/

2. Restart VS Code

3. Test the extension:
   - Open any .rs file
   - Type "stylus-" to see snippets
   - Use Ctrl+Space for completions

## For Distribution:
1. Zip the 'arbitrum-stylus-extension' folder
2. Rename to 'arbitrum-stylus-0.1.0.vsix' (change extension to .vsix)
3. Users can install via VS Code: Extensions → Install from VSIX...

## Troubleshooting:
- If snippets don't appear, try Ctrl+Shift+P → "Developer: Reload Window"
- Ensure your file has .rs extension
- Check that extension is enabled in Extensions panel
`;

fs.writeFileSync(
  path.join(extensionDir, "INSTALLATION.txt"),
  installInstructions
);
console.log("  [OK]   Installation instructions created");

// Step 5: VSIX Package Information
console.log("\nStep 5: VSIX Package Information...");
console.log("  [INFO] To create VSIX package, run: npm run package");
console.log(
  "  [INFO] This will use vsce to generate arbitrum-stylus-0.1.0.vsix"
);
console.log(
  "  [INFO] The VSIX file is the standard way to distribute VS Code extensions"
);

// Step 6: Create installation script
console.log("\nStep 6: Creating installation script...");
const installScript = `#!/bin/bash
# Arbitrum Stylus Extension Installation Script

echo "Installing Arbitrum Stylus Extension..."

# Create extensions directory if it doesn't exist
mkdir -p ~/.vscode/extensions

# Copy extension
cp -r arbitrum-stylus-extension ~/.vscode/extensions/

echo "Extension installed successfully!"
echo "Please restart VS Code to activate the extension."
echo ""
echo "Test the extension by:"
echo "1. Opening any .rs file"
echo "2. Typing 'stylus-' to see snippets"
echo "3. Using Ctrl+Space for completions"
`;

fs.writeFileSync(path.join(extensionDir, "install.sh"), installScript);
fs.chmodSync(path.join(extensionDir, "install.sh"), "755");
console.log("  [OK]   Installation script created");

function copyDir(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyDir(srcPath, destPath);
    } else {
      try {
        fs.copyFileSync(srcPath, destPath);
      } catch (error) {
        console.log(`    [WARN] Failed to copy: ${srcPath} - ${error.message}`);
      }
    }
  }
}

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(" MILESTONE 1 PACKAGING COMPLETE");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("Created package:");
console.log(`1. ${extensionDir}/ - Development package`);
console.log("");
console.log("Next steps:");
console.log("1. Test: ./arbitrum-stylus-extension/install.sh");
console.log("2. Create VSIX: npm run package");
console.log(
  "3. Install: cp -r arbitrum-stylus-extension ~/.vscode/extensions/"
);
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
