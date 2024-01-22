export function sendMessage(request: string) {
	const textOpenAiArea = document.querySelector('#prompt-textarea') as HTMLTextAreaElement;
	if (textOpenAiArea) {
		if (textOpenAiArea) {
			textOpenAiArea.value = request;

			textOpenAiArea.dispatchEvent(new Event('input', { bubbles: true, cancelable: false }));
			textOpenAiArea.style.maxHeight = '80vh';
			textOpenAiArea.style.height = '80vh';
			textOpenAiArea.setSelectionRange(request.length, request.length);
		}
		setTimeout(() => {
			const button = document.querySelector('[data-testid="send-button"]') as HTMLButtonElement;
			button.click();
		}, 500);
	}
	const textClaudeArea = document.querySelector('.ProseMirror') as HTMLTextAreaElement;
	if (textClaudeArea) {
		textClaudeArea.textContent = request;
		const sendBtn = document.querySelector('[aria-label="Send Message"]') as HTMLButtonElement;
		setTimeout(() => {
			if (sendBtn) sendBtn.click();
		}, 500);
	}
}
