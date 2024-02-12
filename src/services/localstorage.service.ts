import localforage from 'localforage';
import { LocalStorageKey } from '../settings/localstorage-key';

interface GetItemResultError {
	error: true;
	content: string;
}

interface SetItemResultSuccess {
	error: false;
	content: string;
}

export interface GetItemResultSuccess<T> {
	error: false;
	content: string;
	data: T;
}
type GetItemResult<T> = GetItemResultError | GetItemResultSuccess<T>;
type SetItemResult = GetItemResultError | SetItemResultSuccess;

export class LocalStorageService<T> {
	constructor(private storageKey: LocalStorageKey) {}
	async getItem(): Promise<GetItemResult<T>> {
		try {
			const data = (await localforage.getItem(this.storageKey)) as T;
			if (!data) throw new Error(`Значение с ключом LocalStorageKey.FolderURl не наедено`);
			return { content: `Значение с ключом ${this.storageKey} получено`, error: false, data };
		} catch (error) {
			return { content: `LocalStorageService.getItem: ${error}`, error: true };
		}
	}

	async setItem<T>(value: T): Promise<SetItemResult> {
		try {
			await localforage.setItem(this.storageKey, value);
			return { content: `Значение ${value} с ключом ${this.storageKey} `, error: false };
		} catch (error) {
			return { content: `LocalStorageService.setItem: ${error}`, error: true };
		}
	}
}
