import { chatGPTExtends } from './componets/chat-gpt-panel/chat-gpt-panel';
import { observerChatPage } from './componets/chat-gpt-panel/observer-chat-page';
import { googleHotKeyExtends } from './componets/google-hot-key/google-hot-key';

import './style.scss';

function initChatGPTExtends() {
	chatGPTExtends();
	observerChatPage(chatGPTExtends);
}

function initHotkeys() {
	googleHotKeyExtends();
}

function initApp() {
	initChatGPTExtends();
	initHotkeys();
}

initApp();
