import axios from 'axios';
import { PageElementService } from '../../services/page-element.service';
import { ExtensionElementsSelector } from '../../settings/elements-selector';

export async function getFileCodeFromPathInput(): Promise<{ content: string; error: boolean }> {
	try {
		const pathInput = new PageElementService(ExtensionElementsSelector.PathInputOne);
		const pathInputValue = pathInput.getValue();

		if (pathInputValue.error) throw new Error(pathInputValue.content);

		const requestStatus = await requestOneFile(pathInputValue.content);

		if (requestStatus.error) throw new Error(requestStatus.content);
		return { content: requestStatus.content, error: false };
	} catch (error) {
		return { content: `код из файла не получен ${error}`, error: true };
	}
}

export async function requestOneFile(path: string) {
	try {
		if (path.length <= 0) throw new Error(`Получено пустое значение пути`);
		const content = await axios(`http://localhost:3333/content/file?path=${path}`);
		if (typeof content.data !== 'string') {
			throw new Error('Неверный тип данных в ответе API. Ожидалась строка.');
		}
		return { content: content.data, error: false };
	} catch (error) {
		return { content: `Запрос по пути ${path} Функция: requestToAPi`, error: true };
	}
}

export async function getFileAndFolderPath() {
	try {
		const pathInput = new PageElementService(ExtensionElementsSelector.PathInputAll);
		const pathInputValue = pathInput.getValue();

		if (pathInputValue.error) throw new Error(pathInputValue.content);

		const requestStatus = await requestAllFile(pathInputValue.content);

		return { content: 'Получены данные с сервера', error: false, data: requestStatus.data };
	} catch (error) {
		return { content: `getFileAndFolderPath: ${error}`, error: true };
	}
}

async function requestAllFile(path: string) {
	try {
		if (path.length <= 0) throw new Error(`Получено пустое значение пути`);
		const content: { fullUrl: string; file: string[] }[] = (
			await axios(`http://localhost:3333/content/all?path=${path}`)
		).data;
		if (!Array.isArray(content)) {
			throw new Error('content.data должен быть массивом');
		}
		for (const item of content) {
			if (typeof item !== 'object') {
				throw new Error('Элемент массива должен быть объектом');
			}

			if (typeof item.fullUrl !== 'string') {
				throw new Error('Поле fullUrl должно быть строкой');
			}

			if (!Array.isArray(item.file)) {
				throw new Error('Поле file должно быть массивом строк');
			}

			for (const fileName of item.file) {
				if (typeof fileName !== 'string') {
					throw new Error('Элемент массива file должен быть строкой');
				}
			}
		}

		return { content: `Значения получены`, error: false, data: content };
	} catch (error) {
		return { content: `Запрос по пути ${path} Функция: requestToAPi`, error: true };
	}
}
