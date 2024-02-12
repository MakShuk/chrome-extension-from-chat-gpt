import { requestOneFile } from './request-to-api';
import { messageConstructor } from '../../script/message-constructor';
import { runBackgroundScript } from '../../script/run-background-script';
import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { getRequestParameter } from './get-request-parameter';
import { sendMessage } from './send-message';
import { saveParamToLocalStorage } from './save-request-param';
import { PageElementService } from '../../services/page-element.service';
import { updateFileAndFolderData } from './set-request-state';

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

				const areaValue = img.getAttribute('area');

				if (!areaValue) return;

				const imgInParent = img.parentElement?.querySelectorAll('img');
				if (imgInParent && imgInParent.length <= 1) {
					initCheckStatusIcon(img);
					checkFullTasks(areaValue);
					updateDataInStorage(img);
				}

				//window.close();
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

const initCheckStatusIcon = (el: Element) => {
	const fileEl = el.parentElement as HTMLDivElement;
	const areaValue = el.getAttribute('area');

	if (fileEl) {
		fileEl.style.gridTemplateColumns = `60% 20% 20%`;
		const classNames = ` ${ExtensionElementsSelector.CreatedImg}`;
		fileEl.innerHTML += `<img class="${classNames} ok-${areaValue}" src="./assets/ok.png">`;
	}
};

const checkFullTasks = (areaValue: string) => {
	const allFileElements = document.querySelectorAll(`.file-in-area-${areaValue}`);
	const allOkElements = document.querySelectorAll(`.ok-${areaValue}`);

	if (allFileElements.length === allOkElements.length) {
		const fullPathElement = document.querySelector(`.full-path-${areaValue}`) as HTMLDivElement;
		fullPathElement.style.backgroundColor = '#228B22';
	}
};

const updateDataInStorage = async (el: Element) => {
	const areaValue = el.getAttribute('area');
	const nameValue = el.getAttribute('name');

	if (!areaValue || !nameValue) {
		console.error('updateDataInStorage: ', 'не найдены атрибуты: ', { areaValue }, { nameValue });
		return;
	}

	const fullPathSelector = `.full-path-${areaValue}`;
	const fullPathElement = new PageElementService(fullPathSelector);

	const fullPath = fullPathElement.getTextContent();

	if (fullPath.error) {
		console.error('updateDataInStorage: ', fullPath.content);
		return;
	}

	await updateFileAndFolderData(fullPath.content, nameValue);
};
