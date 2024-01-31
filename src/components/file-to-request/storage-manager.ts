import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { PageElementService } from '../../services/page-element.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { LocalStorageKey } from '../../settings/localstorage-key';

export async function storageManager() {
	await setFilePath();
	await setFolderPath();
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
		console.error(pathInput.node.content);
		return;
	}

	if (!pathStorageValue.error && pathStorageValue.content.length > 0) {
		pathInput.setValue(pathStorageValue.data);
	}
}
