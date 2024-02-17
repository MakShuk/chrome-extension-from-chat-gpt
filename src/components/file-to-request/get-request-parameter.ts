import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { PageElementService } from '../../services/page-element.service';

export function getRequestParameter() {
	let tasks = getTasks();
	let parameter = getParameters();
	return { tasks, parameter };
}

function getTasks() {
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

function getParameters() {
	const questionsArea = new PageElementService(ExtensionElementsSelector.RequestParam);
	const counter = questionsArea.node.element?.childNodes.length || 0;
	let parameters = '';

	for (let i = 1; i < counter + 1; i++) {
		const questionsInput = new PageElementService(`#flexCheck-${i}`);
		if (questionsInput.isChecked().content === true) {
			parameters += ` ${questionsInput.getValue().content}, ` 
		}
	}
	return parameters;
}
