import axios from 'axios';

export async function requestOneFile(path: string) {
	try {
		if (path.length <= 0) throw new Error(`Получено пустое значение пути`);
		const fullPath = `http://localhost:3333/content/file?path=${path}`;
		const content = await axios(fullPath);
		if (typeof content.data !== 'string') {
			throw new Error('Неверный тип данных в ответе API. Ожидалась строка.');
		}
		return { content: content.data, error: false };
	} catch (error) {
		return { content: `Запрос по пути ${path} Функция: requestToAPi ${error}`, error: true };
	}
}

export async function requestAllFile(path: string) {
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
		console.log(content);
		return { content: `Значения получены`, error: false, data: content };
	} catch (error) {
		return { content: `Запрос по пути ${path} Функция: requestAllFile, ${error}`, error: true };
	}
}
