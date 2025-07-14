const fs = require("fs");
const path = require("path");

console.log("┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓");
console.log("┃  Packaging Verification Test                ┃");
console.log("┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n");

// Test 1: Check if compiled files exist
console.log("Test 1: Checking compiled files...");
const compiledFiles = ["out/extension.js", "out/extension.js.map"];

let allCompiledFilesExist = true;
compiledFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`  [OK]   Found: ${file}`);
  } else {
    console.log(`  [ERR]  Missing: ${file}`);
    allCompiledFilesExist = false;
  }
});

if (!allCompiledFilesExist) {
  console.log("  [ERR]  Compilation required. Run: npm run compile");
  process.exit(1);
}

// Test 2: Check if extension packages exist
console.log("\nTest 2: Checking extension packages...");
const packages = ["arbitrum-stylus-extension", "arbitrum-stylus-0.1.0"];

packages.forEach((pkg) => {
  if (fs.existsSync(pkg)) {
    console.log(`  [OK]   Found: ${pkg}/`);

    // Check critical files in package
    const criticalFiles = [
      "out/extension.js",
      "package.json",
      "language-configuration.json",
      "definitions/syntaxes/stylus-rust.tmLanguage.json",
      "definitions/snippets/stylus-rust.json",
    ];

    let packageValid = true;
    criticalFiles.forEach((file) => {
      const filePath = path.join(pkg, file);
      if (fs.existsSync(filePath)) {
        console.log(`    [OK]   ${file}`);
      } else {
        console.log(`    [ERR]  Missing: ${file}`);
        packageValid = false;
      }
    });

    if (!packageValid) {
      console.log(`  [WARN] Package ${pkg} has missing files`);
    } else {
      console.log(`  [OK]   Package ${pkg} is valid`);
    }
  } else {
    console.log(`  [WARN] Missing: ${pkg}/ (run packaging script first)`);
  }
});

// Test 3: Check VS Code extensions directory
console.log("\nTest 3: Checking VS Code extensions directory...");
const vscodeExtensionsDir = path.join(
  process.env.HOME || process.env.USERPROFILE,
  ".vscode/extensions"
);
if (fs.existsSync(vscodeExtensionsDir)) {
  console.log(
    `  [OK]   VS Code extensions directory exists: ${vscodeExtensionsDir}`
  );

  // Check if our extension is installed
  const installedExtension = path.join(
    vscodeExtensionsDir,
    "arbitrum-stylus-extension"
  );
  if (fs.existsSync(installedExtension)) {
    console.log("  [OK]   Extension is installed in VS Code");
  } else {
    console.log("  [INFO] Extension not installed. Run: npm run install:dev");
  }
} else {
  console.log(
    `  [INFO] VS Code extensions directory doesn't exist: ${vscodeExtensionsDir}`
  );
  console.log(
    "  [INFO] It will be created when you run the installation script"
  );
}

// Test 4: Check package.json configuration
console.log("\nTest 4: Checking package.json configuration...");
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

  // Check main field
  if (packageJson.main === "./out/extension.js") {
    console.log("  [OK]   Main field is correct");
  } else {
    console.log(
      `  [WARN] Main field should be './out/extension.js', found: ${packageJson.main}`
    );
  }

  // Check scripts
  const requiredScripts = [
    "compile",
    "package",
    "package:robust",
    "install:dev",
  ];
  requiredScripts.forEach((script) => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`  [OK]   Script '${script}' exists`);
    } else {
      console.log(`  [WARN] Script '${script}' missing`);
    }
  });
} catch (error) {
  console.log(`  [ERR]  Failed to read package.json: ${error.message}`);
}

// Test 5: Check .vscodeignore
console.log("\nTest 5: Checking .vscodeignore...");
try {
  const vscodeignore = fs.readFileSync(".vscodeignore", "utf8");

  if (vscodeignore.includes("out/**")) {
    console.log("  [ERR]  .vscodeignore excludes compiled output");
  } else {
    console.log("  [OK]   .vscodeignore allows compiled output");
  }

  if (vscodeignore.includes("**/*.map")) {
    console.log("  [WARN] .vscodeignore excludes source maps (this is OK)");
  }
} catch (error) {
  console.log(`  [ERR]  Failed to read .vscodeignore: ${error.message}`);
}

console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log(" VERIFICATION COMPLETE");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
console.log("");
console.log("Next steps:");
console.log("1. If any tests failed, run: npm run build:full");
console.log("2. Test the extension: npm run install:dev");
console.log("3. Create VSIX: npm run package");
console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
