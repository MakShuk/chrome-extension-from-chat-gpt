import { LocalStorageService } from '@services/localstorage.service';
import { LocalStorageKey } from '../../settings/localstorage-key';
import { IUpdateRequestData } from './file-to-request.interface';

export function setRequestToStorage(data: IUpdateRequestData[]) {
	const dataStorage = new LocalStorageService(LocalStorageKey.FileAndFolderData);
	dataStorage.setItem(data);
}

export async function updateFileAndFolderData(fullUrl: string, fileName: string) {
	const dataStorage = new LocalStorageService(LocalStorageKey.FileAndFolderData);
	const getDataStatus = await dataStorage.getItem();
	if (getDataStatus.error) {
		console.error(getDataStatus.error);
		return;
	}

	const newData = updateDataArray(getDataStatus.data, fullUrl, fileName);
	const setDataStatus = await dataStorage.setItem(newData);

	if (setDataStatus.error) {
		console.error(setDataStatus.content);
	}
}

export function updateDataArray(data: IUpdateRequestData[], fullUrl: string, fileName: string) {
	const dataClone = structuredClone(data) as IUpdateRequestData[];
	const clearFullUrl = fullUrl.trim();
	const clearFileName = fileName.trim();

	for (const el of dataClone) {
		if (el.fullUrl === clearFullUrl) {
			if (!el.revueFile) el.revueFile = [];
			if (!el.revueFile.includes(clearFileName)) el.revueFile.push(clearFileName);
		}
	}
	return dataClone;
}
