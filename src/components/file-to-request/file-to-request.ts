import { runBackgroundScript } from '../../script/run-background-script';
import { messageConstructor } from '../../script/message-constructor';
import { PageElementService } from '../../services/page-element.service';
import { ExtensionElementsSelector } from '../../settings/elements-selector';
import {
	getFileAndFolderPath,
	getFileCodeFromPathInput,
	requestOneFile,
} from './get-file-code-from-path-input';
import { sendMessage } from './send-message';

export async function fileToRequest() {
	try {
		const answerButton = new PageElementService(ExtensionElementsSelector.PathButton);
		if (answerButton.node.error) throw new Error(answerButton.node.content);

		answerButton.addEvent(async () => {
			answerButton.hide(true);
			const taskCodeStatus = await getFileCodeFromPathInput();
			const statusArea = new PageElementService(ExtensionElementsSelector.StatusArea);
			if (taskCodeStatus.error) {
				answerButton.hide(false);
				statusArea.hide(false);
				statusArea.setTextContent(taskCodeStatus.content);
			} else {
				statusArea.hide(true);
				answerButton.hide(false);
				const codeInPash = taskCodeStatus.content;
				const task = getRequestParameter();
				const request = messageConstructor(task, codeInPash);
				statusArea.setTextContent(request);
				await runBackgroundScript(sendMessage, [request]);
				window.close();
			}
		});
		return { content: ``, error: false };
	} catch (error) {
		const alertMessage = new PageElementService(ExtensionElementsSelector.StatusArea);
		alertMessage.setTextContent(`${error}`);
		return { content: `${error}`, error: true };
	}
}

function getRequestParameter() {
	const questionsArea = new PageElementService(ExtensionElementsSelector.ExtensionRequest);

	const counter = questionsArea.node.element?.childNodes.length || 0;
	let tasks = '';

	for (let i = 1; i < counter + 1; i++) {
		const questionsInput = new PageElementService(`#questions-${i}`);

		if (questionsInput.isChecked().content === true) {
			tasks += questionsInput.getValue().content;
		}
	}
	return tasks;
}

export async function allFileAndFolderNameToRequest() {
	try {
		console.log('allFileAndFolderNameToRequest');
		const answerButton = new PageElementService(ExtensionElementsSelector.FolderButton);
		if (answerButton.node.error) throw new Error(answerButton.node.content);
		answerButton.addEvent(async () => {
			console.log('click');
			//answerButton.hide(true);
			const taskCodeStatus = await getFileAndFolderPath();
			const statusArea = new PageElementService(ExtensionElementsSelector.StatusArea);
			if (taskCodeStatus.error || !taskCodeStatus.data) {
				answerButton.hide(false);
				statusArea.hide(false);
				statusArea.setTextContent(taskCodeStatus.content);
			} else {
				createFolderAndFileElements(taskCodeStatus.data);
				addEventListenerToImg();
				//window.close();
			}
		});
		return { content: ``, error: false };
	} catch (error) {
		const alertMessage = new PageElementService(ExtensionElementsSelector.StatusArea);
		alertMessage.setTextContent(`${error}`);
		return { content: `${error}`, error: true };
	}
}

function createFolderAndFileElements(data: { fullUrl: string; file: string[] }[]) {
	const bodyElStatus = new PageElementService('#extension-body');
	for (const folder of data) {
		bodyElStatus.addHTML(`<div class="card mb-3" style="width: 100%;">
		<div class="card-header">
		  ${folder.fullUrl}
		</div>
		<div>
	     ${createdFileElement(folder.file)}
	  </div>
	</div>`);
	}
}

function createdFileElement(filesName: string[]) {
	let liEls: string = '';
	filesName.forEach(fileName => {
		liEls += `<file>
		<div>${fileName}</div>
		<img src="./assets/send.png" width="">
		</file>`;
	});
	return liEls;
}

async function addEventListenerToImg() {
	const imgs = document.querySelectorAll('img');

	imgs.forEach(img => {
		img.addEventListener('click', async _event => {
			const cardHeader = img.closest('.card')?.querySelector('.card-header');
			const fileElement = img.closest('file')?.querySelector('div');
			const folderPath = cardHeader?.textContent?.trim() || null;
			const fileName = fileElement?.textContent?.trim() || null;
			if (!folderPath || !fileName) throw new Error(`Ошибка получения пути или имени файла`);
			console.log(folderPath + fileName);
			const statusArea = new PageElementService(ExtensionElementsSelector.StatusArea);
			const { content, error } = await requestOneFile(folderPath + '/' + fileName);
			if (error) throw new Error(content);
			const task = getRequestParameter();
			const request = messageConstructor(task, content);
			statusArea.setTextContent(request);
			await runBackgroundScript(sendMessage, [request]);
			window.close();
		});
	});
}
