import { runBackgroundScript } from '../../script/run-background-script';
import { messageConstructor } from '../../script/message-constructor';
import { PageElementService } from '../../services/page-element.service';
import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { sendMessage } from './send-message';
import { requestAllFile } from './get-file-code-from-path-input';

const TASK = `Check the names of files and folders, give recommendations on naming`;

export function checkFileName() {
	const checkBtn = new PageElementService(ExtensionElementsSelector.FileNameButton);
	const fileNameInput = new PageElementService(ExtensionElementsSelector.PathInputOne);
	const statusArea = new PageElementService(ExtensionElementsSelector.StatusArea);

	checkBtn.addEvent(async () => {
		const value = fileNameInput.getValue();
		if (!value.error && value.content.length > 0) {
			const request = messageConstructor(TASK, '', value.content);
			await runBackgroundScript(sendMessage, [request]);
			window.close();
		} else {
			statusArea.hide(false);
			statusArea.setTextContent(value.content);
		}
	});
}

export function checkAllFolderAndFileName() {
	const checkBtn = new PageElementService(ExtensionElementsSelector.FolderNameButton);
	const fileAndFolderNameInput = new PageElementService(ExtensionElementsSelector.PathInputAll);
	const statusArea = new PageElementService(ExtensionElementsSelector.StatusArea);
	checkBtn.addEvent(async () => {
		const value = fileAndFolderNameInput.getValue();
		if (!value.error && value.content.length > 0) {
			const taskCodeStatus = await requestAllFile(value.content);
			if (taskCodeStatus.data) {
				console.log(splitPatchArray(taskCodeStatus.data));
				const request = messageConstructor(TASK, '', splitPatchArray(taskCodeStatus.data));
				await runBackgroundScript(sendMessage, [request]);
				window.close();
			}
		} else {
			statusArea.hide(false);
			statusArea.setTextContent(value.content);
		}
	});
}

function splitPatchArray(
	array: {
		fullUrl: string;
		file: string[];
	}[],
) {
	let finalPath = '';
	for (const path of array)
		for (const fileName of path.file) {
			finalPath += ` ${path.fullUrl.replace(/\/opt\/app\/data\//, '')}/${fileName}`;
		}
	return finalPath.replace(/\/\/+/g, '/');
}
