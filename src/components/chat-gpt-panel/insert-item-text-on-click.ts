import { PageElementService } from '../../services/page-element.service';
import { ElementsSelector } from '../../settings/elements-selector';

export function insertItemTextOnClick() {
	const dropdownContent = document.querySelector(
		ElementsSelector.ExtensionPanel,
	) as HTMLUListElement;
	const dropdownItems = dropdownContent?.querySelectorAll('li');
	const promptTextArea = new PageElementService(ElementsSelector.PromptTextArea);

	if (dropdownItems instanceof NodeList || Array.isArray(dropdownItems)) {
		for (const item of dropdownItems) {
			if (item instanceof HTMLLIElement) {
				item.addEventListener('click', () => {
					if (promptTextArea.getValue().error) {
						promptTextArea.setValue(item.textContent || '');
					}
					dropdownContent ? (dropdownContent.style.display = 'none') : null;
					promptTextArea.focus();
				});
			}
		}
	}
}
