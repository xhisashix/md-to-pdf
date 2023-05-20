// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const markdown_pdf = require("markdown-pdf");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "md-to-pdf" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "md-to-pdf.export",
    function () {
      // The code you place here will be executed every time your command is executed

      // Get the active text editor
      const editor = vscode.window.activeTextEditor;

      // Get file name
      const file = editor.document.fileName.split(".")[0];
      // generate pdf
      markdown_pdf()
        .from.string(editor.document.getText())
        .to(file + ".pdf", function () {
          console.log("Done");
        });

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from md-to-pdf!");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
