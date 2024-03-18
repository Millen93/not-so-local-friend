import * as vscode from 'vscode';
import { getBotResponse } from './integration';


// Typing Effect
async function typeTextInEditor(editor: vscode.TextEditor, text: string) {
    for (let i = 0; i < text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, text[i]);
        });
    }
}

// Handle user input
async function handleUserInput() {
    const prompt = await vscode.window.showInputBox({
        placeHolder: "Please Enter in your prompt"
    });

    // If user cancels the input
    if (prompt === undefined) {
        return;
    }

    // Get active text editor
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
        return;
    }

    // Display loading message
    editor.edit(editBuilder => {
        editBuilder.insert(editor.selection.active, 'Fetching Response ...');
    });

    // Get the value of 'url' from settings
    const model = vscode.workspace.getConfiguration().get('myPlugin.url');

    if (!model) {
        vscode.window.showErrorMessage('Model not defined in settings.');
        return;
    }


    // Fetch Bot Response
    const botResponse = await getBotResponse(prompt, model);

    // Remove loading message
    const loadingMessageLength = 'Fetching Response ...'.length;

    editor.edit(editBuilder => {
        editBuilder.delete(
            new vscode.Range(
                editor.selection.active.translate(0, -loadingMessageLength),
                editor.selection.active
            )
        );
    });

    // Simulate typing effect for the bot Response
    await typeTextInEditor(editor, botResponse);

    // Display completion
    vscode.window.showInformationMessage('Response Received and Typed');
}

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.getBotResponse', async () => {
        await handleUserInput();
    });
    context.subscriptions.push(disposable);
}
