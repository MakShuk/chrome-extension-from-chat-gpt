import { requestOneFile } from './request-to-api';
import { messageConstructor } from '../../script/message-constructor';
import { runBackgroundScript } from '../../script/run-background-script';
import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { getRequestParameter } from './get-request-parameter';
import { sendMessage } from './send-message';
import { saveParamToLocalStorage } from './save-request-param';

export async function addEventListenerToCreatedImg() {
	try {
		const imgs = findCreatedImages();

		imgs.forEach(img => {
			img.addEventListener('click', async _event => {
				const { folderPath, fileName } = getFileData(img);
				const { content, error } = await requestOneFile(folderPath + '/' + fileName);
				if (error) throw new Error(content);

				const { tasks, parameter } = getRequestParameter();

				const request = messageConstructor(tasks, parameter, content);
				await saveParamToLocalStorage();
				await runBackgroundScript(sendMessage, [request]);

				window.close();
			});
		});
		return { content: `Установленно событие по клику на все элементы img`, error: false };
	} catch (error) {
		return { content: `addEventListenerToImg:${error}`, error: true };
	}
}

const findCreatedImages = () => {
	const imgs = document.querySelectorAll(`.${ExtensionElementsSelector.CreatedImg}`);
	if (imgs.length === 0) {
		throw new Error('Элементы img не найдены');
	}
	return imgs;
};

const getFileData = (img: Element) => {
	const cardHeader = img.closest('.card')?.querySelector('.card-header');
	const fileElement = img.closest('file')?.querySelector('div');

	const folderPath = cardHeader?.textContent?.trim();
	const fileName = fileElement?.textContent?.trim();

	if (!folderPath || !fileName) {
		throw new Error('Ошибка получения данных о файле');
	}

	return { folderPath, fileName };
};
