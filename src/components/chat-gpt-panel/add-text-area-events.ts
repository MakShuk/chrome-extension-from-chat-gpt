import { PageElementService } from '../../services/page-element.service';
import { ElementsSelector } from '../../settings/elements-selector';

const DISPLAY_MODE = 'grid';
const HIDE_DELAY = 300;

export function addTextAreaEvents() {
	const promptTextArea = new PageElementService(ElementsSelector.PromptTextArea);
	const dropdownContentArea = new PageElementService(ElementsSelector.ExtensionPanel);
	promptTextArea.addEvent(() => {
		promptTextArea.getValue().error ? dropdownContentArea.hide(false, DISPLAY_MODE) : null;
	});

	promptTextArea.addEvent(() => {
		promptTextArea.getValue().error ? dropdownContentArea.hide(false, DISPLAY_MODE) : null;
	}, 'focus');

	promptTextArea.addEvent(() => {
		setTimeout(() => {
			promptTextArea.getValue().error ? dropdownContentArea.hide(true, DISPLAY_MODE) : null;
		}, HIDE_DELAY);
	}, 'blur');
}
