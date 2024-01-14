import { PanelRequest } from '../../settings/promts';
import { PageElementService } from '../../services/page-element.service';
import { Page } from '../../services/page.service';
import { elementsSelector } from '../../settings/elements-selector';
import { initPanelCode } from './init-panel-code';
import { addTextAreaEvents } from './add-text-area-events';
import { insertItemTextOnClick } from './insert-item-text-on-click';

const chatGptPage = new Page('chat.openai.com');

export function chatGPTExtends(): void | null {
	if (!chatGptPage.isThisPage()) return null;

	const inputEL = new PageElementService(elementsSelector.infoBlock);
	inputEL.addHTML('', true);

	const content = initPanelCode(PanelRequest);
	inputEL.addHTML(content);

	insertItemTextOnClick();
	addTextAreaEvents();
}