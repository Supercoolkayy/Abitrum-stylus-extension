import * as vscode from "vscode";

// Enhanced completion provider with context-aware suggestions
class StylusCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext
  ): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionItem[]> {
    const items: vscode.CompletionItem[] = [];

    // Get the line text up to the cursor position
    const linePrefix = document
      .lineAt(position)
      .text.substr(0, position.character);

    // Context-aware completions
    if (linePrefix.includes("#[") || linePrefix.includes("pub fn")) {
      // Function attribute completions
      items.push(...this.getFunctionAttributeCompletions());
    } else if (
      linePrefix.includes("Storage") ||
      linePrefix.includes("storage")
    ) {
      // Storage-related completions
      items.push(...this.getStorageCompletions());
    } else if (linePrefix.includes("msg::") || linePrefix.includes("block::")) {
      // Blockchain context completions
      items.push(...this.getBlockchainCompletions());
    } else if (linePrefix.includes("sol!") || linePrefix.includes("sol_")) {
      // Solidity interface completions
      items.push(...this.getSolidityCompletions());
    } else {
      // General Stylus keywords and patterns
      items.push(...this.getGeneralCompletions());
    }

    return items;
  }

  private getFunctionAttributeCompletions(): vscode.CompletionItem[] {
    const attributes = [
      {
        name: "external",
        detail: "External function (callable from outside)",
        documentation:
          "Marks a function as external, making it callable from outside the contract",
      },
      {
        name: "payable",
        detail: "Payable function (can receive ETH)",
        documentation: "Allows the function to receive ETH along with the call",
      },
      {
        name: "pure",
        detail: "Pure function (no state access)",
        documentation: "Function that doesn't read or modify contract state",
      },
      {
        name: "view",
        detail: "View function (read-only)",
        documentation: "Function that reads but doesn't modify contract state",
      },
      {
        name: "entrypoint",
        detail: "Contract entrypoint",
        documentation: "Marks the main entry point for the contract",
      },
    ];

    return attributes.map((attr) => {
      const item = new vscode.CompletionItem(
        attr.name,
        vscode.CompletionItemKind.Keyword
      );
      item.detail = attr.detail;
      item.documentation = attr.documentation;
      item.insertText = `#[${attr.name}]`;
      return item;
    });
  }

  private getStorageCompletions(): vscode.CompletionItem[] {
    const storageTypes = [
      {
        name: "StorageU256",
        detail: "U256 storage variable",
        documentation: "Stores a U256 value in contract storage",
      },
      {
        name: "StorageAddress",
        detail: "Address storage variable",
        documentation: "Stores an Ethereum address in contract storage",
      },
      {
        name: "StorageString",
        detail: "String storage variable",
        documentation: "Stores a string in contract storage",
      },
      {
        name: "StorageBool",
        detail: "Boolean storage variable",
        documentation: "Stores a boolean value in contract storage",
      },
      {
        name: "StorageMap",
        detail: "Key-value storage map",
        documentation: "Stores key-value pairs in contract storage",
      },
      {
        name: "StorageVec",
        detail: "Dynamic array storage",
        documentation: "Stores a dynamic array in contract storage",
      },
    ];

    return storageTypes.map((storage) => {
      const item = new vscode.CompletionItem(
        storage.name,
        vscode.CompletionItemKind.Class
      );
      item.detail = storage.detail;
      item.documentation = storage.documentation;
      item.insertText = `${storage.name}::new()`;
      return item;
    });
  }

  private getBlockchainCompletions(): vscode.CompletionItem[] {
    const blockchain = [
      {
        name: "msg::sender()",
        detail: "Get transaction sender",
        documentation: "Returns the address of the transaction sender",
      },
      {
        name: "msg::value()",
        detail: "Get transaction value",
        documentation: "Returns the ETH value sent with the transaction",
      },
      {
        name: "block::timestamp()",
        detail: "Get block timestamp",
        documentation: "Returns the current block timestamp",
      },
      {
        name: "block::number()",
        detail: "Get block number",
        documentation: "Returns the current block number",
      },
      {
        name: "tx::gas_price()",
        detail: "Get gas price",
        documentation: "Returns the gas price of the current transaction",
      },
      {
        name: "tx::origin()",
        detail: "Get transaction origin",
        documentation: "Returns the original transaction sender",
      },
    ];

    return blockchain.map((bc) => {
      const item = new vscode.CompletionItem(
        bc.name,
        vscode.CompletionItemKind.Function
      );
      item.detail = bc.detail;
      item.documentation = bc.documentation;
      return item;
    });
  }

  private getSolidityCompletions(): vscode.CompletionItem[] {
    const solidity = [
      {
        name: "sol!",
        detail: "Solidity macro",
        documentation: "Macro for defining Solidity interfaces and events",
      },
      {
        name: "sol_interface!",
        detail: "Solidity interface macro",
        documentation: "Macro for defining Solidity interfaces",
      },
      {
        name: "sol_storage!",
        detail: "Solidity storage macro",
        documentation: "Macro for defining Solidity storage layout",
      },
      {
        name: "event",
        detail: "Define an event",
        documentation: "Define a Solidity event",
      },
      {
        name: "error",
        detail: "Define a custom error",
        documentation: "Define a custom Solidity error",
      },
      {
        name: "interface",
        detail: "Define an interface",
        documentation: "Define a Solidity interface",
      },
    ];

    return solidity.map((sol) => {
      const item = new vscode.CompletionItem(
        sol.name,
        vscode.CompletionItemKind.Keyword
      );
      item.detail = sol.detail;
      item.documentation = sol.documentation;
      return item;
    });
  }

  private getGeneralCompletions(): vscode.CompletionItem[] {
    const general = [
      {
        name: "external",
        detail: "External function modifier",
        documentation: "Marks a function as external",
      },
      {
        name: "payable",
        detail: "Payable function modifier",
        documentation: "Allows function to receive ETH",
      },
      {
        name: "pure",
        detail: "Pure function modifier",
        documentation: "Function that doesn't access state",
      },
      {
        name: "view",
        detail: "View function modifier",
        documentation: "Read-only function",
      },
      {
        name: "storage",
        detail: "Storage attribute",
        documentation: "Marks a struct as storage",
      },
      {
        name: "entrypoint",
        detail: "Entry point attribute",
        documentation: "Marks the main contract entry point",
      },
      {
        name: "inherit",
        detail: "Inheritance attribute",
        documentation: "Inherits from another contract",
      },
      {
        name: "sol_storage",
        detail: "Solidity storage macro",
        documentation: "Define Solidity storage layout",
      },
      {
        name: "sol_interface",
        detail: "Solidity interface macro",
        documentation: "Define Solidity interface",
      },
      {
        name: "sol!",
        detail: "Solidity macro",
        documentation: "General Solidity macro",
      },
      {
        name: "msg",
        detail: "Message context",
        documentation: "Access to transaction message data",
      },
      {
        name: "block",
        detail: "Block context",
        documentation: "Access to block data",
      },
      {
        name: "tx",
        detail: "Transaction context",
        documentation: "Access to transaction data",
      },
    ];

    return general.map((gen) => {
      const item = new vscode.CompletionItem(
        gen.name,
        vscode.CompletionItemKind.Keyword
      );
      item.detail = gen.detail;
      item.documentation = gen.documentation;
      return item;
    });
  }
}

export function activate(context: vscode.ExtensionContext) {
  console.log("Arbitrum Stylus Extension activated");
  initializeCoreFeatures(context);
  registerCoreCommands(context);
}

function initializeCoreFeatures(context: vscode.ExtensionContext) {
  const stylusSelector: vscode.DocumentSelector = [
    { language: "stylus-rust", scheme: "file" },
    { language: "rust", scheme: "file" },
  ];
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      stylusSelector,
      new StylusCompletionProvider(),
      ".",
      ":",
      "(",
      "[",
      "#"
    )
  );
}

function registerCoreCommands(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("stylus.validateContract", () => {
      vscode.window.showInformationMessage("Validating contract...");
    }),
    vscode.commands.registerCommand("stylus.runTests", () => {
      vscode.window.showInformationMessage("Running tests...");
    }),
    vscode.commands.registerCommand("stylus.deployContract", () => {
      vscode.window.showInformationMessage("Deploying contract...");
    })
  );
}

export function deactivate() {
  console.log("Arbitrum Stylus Extension deactivated");
}
