import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { PageElementService } from '../../services/page-element.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { LocalStorageKey } from '../../settings/localstorage-key';
import { hideAllInput } from './get-all-file-and-folder-name';
import { createFolderAndFileElements } from './create-folder-and-file-elements';
import { addEventListenerToCreatedImg } from './add-event-listener-to-created-Img';
import { addResetButtonEvent } from './reset-button-event';

export async function storageManager() {
	await setFilePath();
	await setFolderPath();
	await setRequestAndParam();
	await checkDataRequestStatus();
}

export async function setRequestAndParam() {
	await setExtensionRequest();
	await setExtensionRequestParam();
}

async function setFilePath() {
	const pathInput = new PageElementService(ExtensionElementsSelector.PathInputOne);
	const pathStorage = new LocalStorageService(LocalStorageKey.FileURL);

	const pathStorageValue = await pathStorage.getItem();

	if (pathInput.node.error) {
		return;
	}

	if (!pathStorageValue.error && pathStorageValue.content.length > 0) {
		pathInput.setValue(pathStorageValue.data);
	}
}

async function setFolderPath() {
	const pathInput = new PageElementService(ExtensionElementsSelector.PathInputAll);
	const pathStorage = new LocalStorageService(LocalStorageKey.FolderURL);

	const pathStorageValue = await pathStorage.getItem();

	if (pathInput.node.error) {
		return;
	}

	if (!pathStorageValue.error && pathStorageValue.content.length > 0) {
		pathInput.setValue(pathStorageValue.data);
	}
}

async function setExtensionRequest() {
	const extensionRequestStorage = new LocalStorageService(LocalStorageKey.Request);
	const resultStatus = await extensionRequestStorage.getItem();

	if (resultStatus.error) return;

	const data = resultStatus.data as number[] | [2];

	if (Array.isArray(data) && data.every(item => Number.isInteger(item))) {
		data.forEach(e => {
			const el = document.querySelector(`#questions-${e}`) as HTMLInputElement;
			el.checked = true;
		});
	}
}

async function setExtensionRequestParam() {
	const extensionRequestStorage = new LocalStorageService(LocalStorageKey.RequestParam);
	const resultStatus = await extensionRequestStorage.getItem();
	if (resultStatus.error) return;

	const data = resultStatus.data as number[] | [2];

	if (Array.isArray(data) && data.every(item => Number.isInteger(item))) {
		data.forEach(e => {
			const el = document.querySelector(`#flexCheck-${e}`) as HTMLInputElement;
			el.checked = true;
		});
	}
}

async function checkDataRequestStatus() {
	const dataStorage = new LocalStorageService(LocalStorageKey.FileAndFolderData);
	const storageStatus = await dataStorage.getItem();
	if (!storageStatus.error && storageStatus.data.length > 0) {
		const resetButton = new PageElementService(ExtensionElementsSelector.ResetButton);
		resetButton.hide(false);
		hideAllInput();
		createFolderAndFileElements(storageStatus.data);
		await addEventListenerToCreatedImg();
		addResetButtonEvent();
	}
}
