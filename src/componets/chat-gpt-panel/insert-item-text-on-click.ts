import { PageElementService } from '../../services/page-element.service';
import { elementsSelector } from '../../settings/elements-selector';

export function insertItemTextOnClick() {
	const dropdownContent = document.querySelector(
		elementsSelector.extentionPanel,
	) as HTMLUListElement;
	const dropdownItems = dropdownContent?.querySelectorAll('li');
	const promtTextArea = new PageElementService(elementsSelector.promtTextArea);

	if (dropdownItems instanceof NodeList || Array.isArray(dropdownItems)) {
		for (const item of dropdownItems) {
			if (item instanceof HTMLLIElement) {
				item.addEventListener('click', () => {
					if (promtTextArea.getValue().error) {
						promtTextArea.setValue(item.textContent || '');
					}
					dropdownContent ? (dropdownContent.style.display = 'none') : null;
					promtTextArea.focus();
				});
			}
		}
	}
}
