import { runBackgroundScript } from '../../script/run-background-script';
import { messageConstructor } from '../../script/message-constructor';
import { PageElementService } from '../../services/page-element.service';
import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { getFileAndFolderPath, getFileCodeFromPathInput } from './get-file-code-from-path-input';
import { sendMessage } from './send-message';
import { createFolderAndFileElements } from './create-folder-and-file-elements';
import { getRequestParameter } from './get-request-parameter';
import { addEventListenerToCreatedImg } from './add-event-listener-to-created-Img';

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

export async function allFileAndFolderNameToRequest() {
	try {
		const answerButton = new PageElementService(ExtensionElementsSelector.FolderButton);
		if (answerButton.node.error) throw new Error(answerButton.node.content);
		answerButton.addEvent(async () => {
			const taskCodeStatus = await getFileAndFolderPath();
			const statusArea = new PageElementService(ExtensionElementsSelector.StatusArea);
			if (taskCodeStatus.error || !taskCodeStatus.data || taskCodeStatus.data?.length === 0) {
				answerButton.hide(false);
				statusArea.hide(false);
				statusArea.setTextContent(
					`${taskCodeStatus.content}, количество элементов: ${taskCodeStatus.data?.length}`,
				);
			} else {
				createFolderAndFileElements(taskCodeStatus.data);
				addEventListenerToCreatedImg();
			}
		});
		return { content: ``, error: false };
	} catch (error) {
		const alertMessage = new PageElementService(ExtensionElementsSelector.StatusArea);
		alertMessage.setTextContent(`${error}`);
		return { content: `${error}`, error: true };
	}
}
