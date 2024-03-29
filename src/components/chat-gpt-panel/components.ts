import { PanelRequest } from '../../settings/prompt';
import { PageElementService } from '../../services/page-element.service';
import { Page } from '../../services/page.service';
import { ElementsSelector } from '../../settings/elements-selector';
import { initPanelCode } from './init-panel-code';
import { addTextAreaEvents } from './add-text-area-events';
import { insertItemTextOnClick } from './insert-item-text-on-click';

export function chatGPTExtends(): void {
	const chatGptPage = new Page('chat.openai.com');
	if (!chatGptPage.isThisPage()) return;

	const inputEL = new PageElementService(ElementsSelector.InfoBlock);
	inputEL.addHTML('', true);

	const content = initPanelCode(PanelRequest);
	inputEL.addHTML(content);

	insertItemTextOnClick();
	addTextAreaEvents();
}
