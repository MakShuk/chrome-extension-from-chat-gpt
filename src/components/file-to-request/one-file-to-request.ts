import { runBackgroundScript } from '../../script/run-background-script';
import { messageConstructor } from '../../script/message-constructor';
import { PageElementService } from '../../services/page-element.service';
import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { requestOneFile } from './request-to-api';
import { sendMessage } from './send-message';
import { getRequestParameter } from './get-request-parameter';
import { LocalStorageKey } from '../../settings//localstorage-key';
import { LocalStorageService } from '../../services/localstorage.service';
import { saveParamToLocalStorage } from './save-request-param';

export async function getOneFileToRequest() {
	try {
		const answerButton = new PageElementService(ExtensionElementsSelector.PathButton);
		const filePathStorage = new LocalStorageService(LocalStorageKey.FileURL);
		const pathInput = new PageElementService(ExtensionElementsSelector.PathInputOne);

		if (answerButton.node.error) throw new Error(answerButton.node.content);
		if (pathInput.node.error) throw new Error(pathInput.node.content);

		answerButton.addEvent(async () => {
			answerButton.hide(true);
			const pathInputValue = pathInput.getValue();
			const taskCodeStatus = await requestOneFile(pathInputValue.content);
			const statusArea = new PageElementService(ExtensionElementsSelector.StatusArea);
			if (taskCodeStatus.error) {
				answerButton.hide(false);
				statusArea.hide(false);
				statusArea.setTextContent(taskCodeStatus.content);
			} else {
				statusArea.hide(true);
				answerButton.hide(false);
				await filePathStorage.setItem(pathInputValue.content);
				const codeInPash = taskCodeStatus.content;
				const { tasks, parameter } = getRequestParameter();
				const request = messageConstructor(tasks, parameter, codeInPash);
				await runBackgroundScript(sendMessage, [request]);
				await saveParamToLocalStorage();
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
