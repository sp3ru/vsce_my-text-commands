
import * as vscode from 'vscode';

function multiRange(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
	console.log("run multiRange");
	textEditor.edit(edd => {
		let range_numb = 0;
		let delete_selected = false;
		if(textEditor.selections.length > 0){
			let line = textEditor.document.getText(textEditor.selections[0]);
			let linenumb = Number(line);
			if (!isNaN(linenumb) ){
				range_numb = linenumb;
				delete_selected = true;
			}

		}
		for (let selection of textEditor.selections) {
			let line = textEditor.document.getText(selection);
			if (delete_selected){
				line= "";
			}
			edd.replace(selection, line + range_numb.toString());
			range_numb += 1;
		}
	});


}


function changeSlash(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
	console.log("run changeSlash");
	textEditor.edit( edd =>{
		for (let selection of textEditor.selections) {
			let line = textEditor.document.getText(selection);
			if (line.indexOf("\\") > -1){
				line = line.replaceAll("\\\\", "/");
				line = line.replaceAll("\\", "/");
			}else{
				line = line.replaceAll("/", "\\");
			}
			edd.replace(selection, line);
		}
	});

}


function splitIntoWord(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
	console.log("run splitIntoWord");
	let newSelections: vscode.Selection[] = [];
	
	for (let selection of textEditor.selections) {
		let line = textEditor.document.lineAt(selection.start);
		if (selection.isSingleLine) {

			if (line.text.length <= 1){
				continue;
			}

			let startIndex = 0;
			let isWord = false;

			const separatorSymbols: RegExp = /\s+/;
			for (let chIndx = selection.start.character; chIndx <= selection.end.character; chIndx++) {
				let symbol = line.text.charAt(chIndx);
				let foundSeparator = symbol.search(separatorSymbols);
				if ((foundSeparator === 0) || (chIndx === selection.end.character)){
					if (isWord){
						newSelections.push(new vscode.Selection(
							new vscode.Position(line.lineNumber, startIndex),
							new vscode.Position(line.lineNumber, chIndx),
						));
					}
					isWord = false;
				} else{
					if (isWord === false){
						startIndex = chIndx;
						isWord = true;
					}
				}
			}
			
			continue;
		}

		newSelections.push(new vscode.Selection(
			selection.start,
			line.range.end
		));
		for (let lineNum = selection.start.line + 1; lineNum < selection.end.line; lineNum++) {
			line = textEditor.document.lineAt(lineNum);
			newSelections.push(new vscode.Selection(
				line.range.start,
				line.range.end
			));
		}
		if (selection.end.character > 0) {
			newSelections.push(new vscode.Selection(
				selection.end.with(undefined, 0),
				selection.end
			));
		}
	}
	textEditor.selections = newSelections;
}


export function activate(context: vscode.ExtensionContext) {

	const d1 = vscode.commands.registerTextEditorCommand('my-text-commands.splitIntoWord', splitIntoWord);
	context.subscriptions.push(d1);

	const d2 = vscode.commands.registerTextEditorCommand('my-text-commands.changeSlash', changeSlash);
	context.subscriptions.push(d2);

	const d3 = vscode.commands.registerTextEditorCommand('my-text-commands.multiRange', multiRange);
	context.subscriptions.push(d3);

}



export function deactivate() {
	
}
