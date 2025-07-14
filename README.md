# Arbitrum Stylus VS Code Extension

A VS Code extension for Arbitrum Stylus smart contract development, providing syntax highlighting, code snippets, and language support for Stylus Rust contracts.

## [TARGET] Milestone 1: Project Setup & Basic Language Support

This extension provides the foundational features for Stylus development:

### [OK] **Features Implemented**

- **TypeScript Extension Scaffold** - Clean, modern VS Code extension structure
- **Stylus Syntax Highlighting** - Custom TextMate grammar for Stylus Rust
- **Code Snippets** - Comprehensive snippets for common Stylus patterns
- **Language Activation** - Activates on `.rs` files with Stylus content
- **IntelliSense Support** - Keyword completion and suggestions

### [PKG] **Installation**

#### For Development/Testing:

```bash
# Clone the repository
git clone <your-repo-url>
cd arbitrum-stylus

# Install dependencies
npm install

# Package for development
npm run package:dev

# Install to VS Code extensions
npm run install:dev
```

#### For Production:

```bash
# Create VSIX package
npm run package

# Install the .vsix file in VS Code
# Extensions → Install from VSIX...
```

### [ROCKET] **Usage**

1. **Open any `.rs` file** in VS Code
2. **Type `stylus-`** to see available snippets:

   - `stylus-storage` - Basic storage contract template
   - `stylus-view` - View function template
   - `stylus-payable` - Payable function template
   - `stylus-event` - Event declaration template
   - `stylus-error` - Error handling template
   - `stylus-imports` - Common import statements
   - `stylus-access` - Access control pattern
   - `stylus-math` - Safe math operations
   - `stylus-interface` - Interface declaration

3. **Use `Ctrl+Space`** for keyword completions
4. **Test the extension** with the provided `test-stylus.rs` file

### [ART] **Syntax Highlighting**

The extension provides syntax highlighting for:

- Stylus-specific attributes (`#[external]`, `#[payable]`, etc.)
- Storage types (`StorageU256`, `StorageAddress`, etc.)
- Solidity integration (`sol!` macros)
- Built-in functions (`msg::value()`, `block::timestamp()`, etc.)

### [DIR] **Project Structure**

```
arbitrum-stylus/
├── src/
│   └── extension.ts          # Main extension logic
├── definitions/
│   ├── syntaxes/
│   │   └── stylus-rust.tmLanguage.json  # Syntax highlighting
│   └── snippets/
│       └── stylus-rust.json             # Code snippets
├── language-configuration.json          # Language settings
├── package.json                         # Extension manifest
├── test-stylus.rs                       # Test file
└── package-robust.js                    # Development packaging
```

### [WRENCH] **Development**

#### Available Scripts:

- `npm run compile` - Compile TypeScript
- `npm run package` - Create VSIX package
- `npm run package:dev` - Create development package
- `npm run install:dev` - Install for development
- `npm run verify` - Verify packaging setup

#### Testing:

1. Run `npm run install:dev`
2. Restart VS Code
3. Open `test-stylus.rs`
4. Test snippets and syntax highlighting

### [TARGET] **Milestone 1 Goals**

- [OK] Clean VS Code extension scaffold using TypeScript
- [OK] Stylus-specific syntax highlighting
- [OK] Useful Stylus code snippets
- [OK] Language activation and testing inside `.rs` files
- [OK] Working `.vsix` package generation
- [OK] Clean, organized project structure

### [LIST] **Next Steps (Future Milestones)**

- **Milestone 2**: 
- **Milestone 3**: 
- **Milestone 4**: 
- **Milestone 5**: 

### [HANDSHAKE] **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run verify`
5. Submit a pull request

### [DOC] **License**

This project is licensed under the MIT License.

---

**Note**: This extension is designed specifically for Arbitrum Stylus development. It extends Rust language support with Stylus-specific features for smart contract development on Arbitrum.
