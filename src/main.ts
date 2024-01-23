import { chatGPTExtends } from './components/chat-gpt-panel/components';
import { observerChatPage } from './components/chat-gpt-panel/observer-chat-page';
import {
	allFileAndFolderNameToRequest,
	fileToRequest,
} from './components/file-to-request/file-to-request';
import { googleHotKeyExtends } from './components/google-hot-key/google-hot-key';

import './style.scss';

function initChatGPTExtends() {
	try {
		chatGPTExtends();
		observerChatPage(chatGPTExtends);
		fileToRequest();
		allFileAndFolderNameToRequest();
		return { content: `Функции чата выполнены без ошибок`, error: false };
	} catch (error) {
		return { content: `${error}`, error: true };
	}
}

function initHotkeys() {
	googleHotKeyExtends();
}

function initApp() {
	initChatGPTExtends();
	initHotkeys();
}

initApp();
