import { Page } from '../../services/page.service';

export function observerChatPage(fn: () => void): void {
	const chatGptPage = new Page('chat.openai.com');
	if (!chatGptPage.isThisPage()) return;
	const targetElement = document.querySelector('main') as HTMLElement;
	const textarea = document.getElementById('prompt-textarea') as HTMLTextAreaElement;
	const observer = new MutationObserver(function (mutationsList, _) {
		for (const mutation of mutationsList) {
			if (mutation.target === targetElement) {
				fn();
				textarea.focus();
			}
		}
	});

	const config: MutationObserverInit = { attributes: true, childList: true, subtree: true };
	observer.observe(targetElement, config);
}
