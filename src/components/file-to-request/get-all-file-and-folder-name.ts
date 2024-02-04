import { PageElementService } from '../../services/page-element.service';
import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { requestAllFile } from './get-file-code-from-path-input';

import { createFolderAndFileElements } from './create-folder-and-file-elements';

import { addEventListenerToCreatedImg } from './add-event-listener-to-created-Img';
import { LocalStorageKey } from '../../settings/localstorage-key';
import { LocalStorageService } from '../../services/localstorage.service';

export async function getAllFileAndFolderNameToRequest() {
	try {
		const answerButton = new PageElementService(ExtensionElementsSelector.FolderButton);
		const folderPathStorage = new LocalStorageService(LocalStorageKey.FolderURL);
		const pathInput = new PageElementService(ExtensionElementsSelector.PathInputAll);

		if (answerButton.node.error) throw new Error(answerButton.node.content);
		if (pathInput.node.error) throw new Error(pathInput.node.content);

		answerButton.addEvent(async () => {
			const pathInput = new PageElementService(ExtensionElementsSelector.PathInputAll);
			const pathInputValue = pathInput.getValue();
			const taskCodeStatus = await requestAllFile(pathInputValue.content);
			const statusArea = new PageElementService(ExtensionElementsSelector.StatusArea);
			if (taskCodeStatus.error || !taskCodeStatus.data || taskCodeStatus.data?.length === 0) {
				statusArea.hide(false);
				statusArea.setTextContent(
					`${taskCodeStatus.content}, количество элементов: ${taskCodeStatus.data?.length}`,
				);
			} else {
				hideAllInput();
				await folderPathStorage.setItem(pathInputValue.content);
				createFolderAndFileElements(taskCodeStatus.data);
				addEventListenerToCreatedImg();
			}
		});
		return { content: ``, error: false };
	} catch (error) {
		const alertMessage = new PageElementService(ExtensionElementsSelector.StatusArea);
		alertMessage.setTextContent(`${error}`);
		return { content: `${error}`, error: true };
	}
}

function hideAllInput() {
	const inputAreaElement = new PageElementService(`#input-area`);
	inputAreaElement.hide(true);
}
