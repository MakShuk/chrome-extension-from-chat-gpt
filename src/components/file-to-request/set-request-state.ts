import { LocalStorageService } from '@services/localstorage.service';
import { LocalStorageKey } from '../../settings/localstorage-key';

interface IUpdateRequestData {
	fullUrl: string;
	file: string[];
	revueFile?: string[];
}

export function setRequestToStorage(data: IUpdateRequestData[]) {
	const dataStorage = new LocalStorageService(LocalStorageKey.FileAndFolderData);
	dataStorage.setItem(data);
}

export function updateRequestData(data: IUpdateRequestData[], fullUrl: string, fileName: string) {
	const foundObject = data.find(item => item.fullUrl === fullUrl);

	if (foundObject) {
		if (!foundObject.revueFile) {
			foundObject.revueFile = [];
		}
		foundObject.revueFile.push(fileName);
	} else {
		console.error(`Запись с ключом ${fullUrl} не найдена`);
		return data;
	}
	const filterObject = data.filter(item => item.fullUrl !== fullUrl);
	return [...filterObject, foundObject];
}
