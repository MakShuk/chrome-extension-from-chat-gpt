import { runBackgroundScript } from '../../script/run-background-script';
import { messageConstructor } from '../../script/message-constructor';
import { PageElementService } from '../../services/page-element.service';
import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { sendMessage } from './send-message';
import { requestAllFile } from './request-to-api';
import { IUpdateRequestData } from './file-to-request.interface';

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

function splitPatchArray(array: IUpdateRequestData[]): string {
	let finalPath = '';
	for (const path of array) {
		if (path.fullUrl && path.file && path.file.length > 0) {
			for (const fileName of path.file) {
				finalPath += ` ${path.fullUrl.replace(/\/opt\/app\/data\//, '')}/${fileName}`;
			}
		}
	}
	return finalPath.replace(/\/\/+/g, '/');
}
