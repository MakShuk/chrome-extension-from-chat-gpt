import { PageElementService } from '../../services/page-element.service';
import { elementsSelector } from '../../settings/elements-selector';

const DISPLAY_MODE = 'grid';
const HIDE_DELAY = 300;

export function addTextAreaEvents() {
	const promtTextArea = new PageElementService(elementsSelector.promtTextArea);
	const dropdownContentArea = new PageElementService(elementsSelector.extentionPanel);
	promtTextArea.addEvent(() => {
		promtTextArea.getValue().error ? dropdownContentArea.hide(false, DISPLAY_MODE) : null;
	});

	promtTextArea.addEvent(() => {
		promtTextArea.getValue().error ? dropdownContentArea.hide(false, DISPLAY_MODE) : null;
	}, 'focus');

	promtTextArea.addEvent(() => {
		setTimeout(() => {
			promtTextArea.getValue().error ? dropdownContentArea.hide(true, DISPLAY_MODE) : null;
		}, HIDE_DELAY);
	}, 'blur');
}
