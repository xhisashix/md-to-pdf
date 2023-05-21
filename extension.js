// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const markdown_pdf = require("markdown-pdf");
const path = require("path");

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
      markdown_pdf({})
        .from(file + ".md")
        .to(file + ".pdf", function () {
          console.log("Done");
        });

      // Display a message box to the user
      vscode.window.showInformationMessage("Exported to " + file + ".pdf");
    }
  );

  let createFile = vscode.commands.registerCommand(
    "md-to-pdf.createFile",
    function () {
      // Create markdown file
      vscode.window.showInputBox({ prompt: "File name" }).then((value) => {
        var createFileName = "";
        if (value) {
          createFileName = `# ${value}`;
        } else {
          // 現在時刻を取得してファイル名にする
          const date = new Date();
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const day = date.getDate();

          createFileName = `# ${year}-${month}-${day}`;
        }
        vscode.workspace
          .openTextDocument({
            content: createFileName,
            language: "markdown",
          })
          .then((doc) => {
            vscode.window.showTextDocument(doc);
          });
      });
    }
  );

  context.subscriptions.push(disposable);
  context.subscriptions.push(createFile);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
