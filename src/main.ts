import { getOneFileToRequest } from './components/file-to-request/one-file-to-request';
import { chatGPTExtends } from './components/chat-gpt-panel/components';
import { observerChatPage } from './components/chat-gpt-panel/observer-chat-page';
import { getAllFileAndFolderNameToRequest } from './components/file-to-request/get-all-file-and-folder-name';
import { storageManager } from './components/file-to-request/storage-manager';
import { googleHotKeyExtends } from './components/google-hot-key/google-hot-key';

import './style.scss';
import {
	checkAllFolderAndFileName,
	checkFileName,
} from './components/file-to-request/check-folder-and-file-name';

function initChatGPTExtends() {
	try {
		chatGPTExtends();
		observerChatPage(chatGPTExtends);
		getOneFileToRequest();
		getAllFileAndFolderNameToRequest();
		checkFileName();
		checkAllFolderAndFileName();
		return { content: `Функции чата выполнены без ошибок`, error: false };
	} catch (error) {
		const errorMessage = `initChatGPTExtends: ${error}`;
		console.error(errorMessage);
		return { content: errorMessage, error: true };
	}
}

function initHotkeys() {
	googleHotKeyExtends();
}

async function initCodeReview() {
	storageManager();
}

function initApp() {
	initChatGPTExtends();
	initHotkeys();
	initCodeReview();
}

initApp();
