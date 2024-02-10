import { PageElementService } from '../../services/page-element.service';
import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { requestAllFile } from './request-to-api';
import { createFolderAndFileElements } from './create-folder-and-file-elements';
import { addEventListenerToCreatedImg } from './add-event-listener-to-created-Img';
import { LocalStorageKey } from '../../settings/localstorage-key';
import { LocalStorageService } from '../../services/localstorage.service';
import { saveParamToLocalStorage } from './save-request-param';
import { setRequestAndParam } from './storage-manager';
import { setRequestToStorage } from './set-request-state';
import { addResetButtonEvent } from './reset-button-event';

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
				await saveParamToLocalStorage();
				createFolderAndFileElements(taskCodeStatus.data);
				await addEventListenerToCreatedImg();
				await setRequestAndParam();
				setRequestToStorage(taskCodeStatus.data);
				addResetButtonEvent();
				const resetButton = new PageElementService(ExtensionElementsSelector.ResetButton);
				resetButton.hide(false, 'grid');
			}
		});
		return { content: ``, error: false };
	} catch (error) {
		const alertMessage = new PageElementService(ExtensionElementsSelector.StatusArea);
		alertMessage.setTextContent(`${error}`);
		return { content: `${error}`, error: true };
	}
}

export function hideAllInput() {
	const inputAreaElement = new PageElementService(ExtensionElementsSelector.InputArea);
	inputAreaElement.hide(true);
}
