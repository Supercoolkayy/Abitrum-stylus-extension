# Arbitrum Stylus VS Code Extension - Packaging Guide

## [WRENCH] Issues Fixed

### 1. **Missing Test Files**

- [OK] Added proper file existence checks in packaging scripts
- [OK] Made test files optional in the robust packaging script
- [OK] Added graceful handling for missing files

### 2. **Wrong File Paths**

- [OK] Fixed all file copy paths to use correct source locations
- [OK] Updated packaging scripts to copy from root directory, not from extension directory
- [OK] Added proper path resolution for all file operations

### 3. **Extension Entrypoint Issues**

- [OK] Updated `package.json` main field to `"./out/extension.js"`
- [OK] Fixed `.vscodeignore` to include compiled output
- [OK] Ensured `out/extension.js` is properly included in VSIX packages

### 4. **VS Code Extensions Directory**

- [OK] Added automatic creation of `~/.vscode/extensions/` directory
- [OK] Created installation scripts with proper error handling
- [OK] Added verification steps for successful installation

### 5. **Build Process Improvements**

- [OK] Created robust packaging script with comprehensive error handling
- [OK] Added full build and test automation script
- [OK] Improved TypeScript compilation with fallback options

## [PKG] Packaging Options

### Option 1: Full Build & Test (Recommended)

```bash
# Complete build, package, and install process
npm run build:full
```

### Option 2: Robust Packaging Only

```bash
# Just package the extension
npm run package:robust
```

### Option 3: Manual Installation

```bash
# Package and install to VS Code extensions
npm run install:dev
```

### Option 4: VSIX Package Creation

```bash
# Create official VSIX package
npm run package
```

## [ROCKET] Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Build and test:**

   ```bash
   npm run build:full
   ```

3. **Restart VS Code**

4. **Test the extension:**
   - Open any `.rs` file
   - Type `stylus-` to see snippets
   - Use `Ctrl+Space` for completions

## [DIR] Generated Files

After running the packaging scripts, you'll get:

- `arbitrum-stylus-extension/` - Development package

  - Contains all extension files
  - Ready for manual installation
  - Includes installation script

- `arbitrum-stylus-0.1.0/` - VSIX-ready package

  - Contains the same files as development package
  - Ready for `vsce package` command

- `arbitrum-stylus-0.1.0.vsix` - Official VSIX package
  - Created by `vsce package`
  - Ready for distribution

## [MAGNIFY] Verification Steps

### Check Extension Files

```bash
# Verify compiled output exists
ls -la out/extension.js

# Check extension package structure
ls -la arbitrum-stylus-extension/

# Verify VS Code extensions installation
ls -la ~/.vscode/extensions/ | grep arbitrum
```

### Test Extension Functionality

1. Open VS Code
2. Open any `.rs` file
3. Type `stylus-` and verify snippets appear
4. Use `Ctrl+Space` for completions
5. Check that syntax highlighting works

## [WRENCH] Troubleshooting

### TypeScript Compilation Fails

```bash
# Clean and reinstall
rm -rf node_modules out/
npm install
npm run compile
```

### Extension Not Loading

```bash
# Check installation
ls -la ~/.vscode/extensions/arbitrum-stylus-extension/

# Reinstall extension
npm run install:dev

# Reload VS Code window (Ctrl+Shift+P → "Developer: Reload Window")
```

### VSIX Package Issues

```bash
# Install vsce globally
npm install -g @vscode/vsce

# Create VSIX package
vsce package

# Verify package contents
unzip -l arbitrum-stylus-0.1.0.vsix
```

## [LIST] Script Reference

| Script              | Purpose                              | Command                  |
| ------------------- | ------------------------------------ | ------------------------ |
| `build-and-test.sh` | Complete build and test process      | `./build-and-test.sh`    |
| `package-robust.js` | Robust packaging with error handling | `node package-robust.js` |
| `package-manual.js` | Original manual packaging            | `node package-manual.js` |
| `package-simple.js` | Simple packaging with npx fallback   | `node package-simple.js` |

## [TARGET] Best Practices

1. **Always run `npm run build:full`** for complete testing
2. **Use the robust packaging script** for production builds
3. **Test in a clean VS Code instance** after installation
4. **Verify all snippets and completions** work as expected
5. **Check the extension in VS Code's Extensions panel**

## [REFRESH] Development Workflow

1. Make changes to source code
2. Run `npm run compile` to test compilation
3. Run `npm run build:full` for complete testing
4. Test the extension in VS Code
5. Commit changes when satisfied

## [PHONE] Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Run `npm run build:full` for complete diagnostics
4. Check the generated log output for specific errors
