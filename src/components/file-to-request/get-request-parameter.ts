import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { PageElementService } from '../../services/page-element.service';

export function getRequestParameter() {
	const questionsArea = new PageElementService(ExtensionElementsSelector.ExtensionRequest);

	const counter = questionsArea.node.element?.childNodes.length || 0;
	let tasks = '';

	for (let i = 1; i < counter + 1; i++) {
		const questionsInput = new PageElementService(`#questions-${i}`);

		if (questionsInput.isChecked().content === true) {
			tasks += questionsInput.getValue().content;
		}
	}
	return tasks;
}
