import { IPanelRequest } from '../../settings/promts';
import { classesStyle, inlineStyle } from '../../settings/inline-style';

export function initPanelCode(gen: IPanelRequest[]): string {
	let code: string = `<ul id="extension-panel" ${classesStyle.ul} ${inlineStyle.ul}>`;

	for (let textObj of gen) {
		code += `<li ${classesStyle.li} ${inlineStyle.li}>${createHideSpan(
			textObj.hideText,
		)} ${textObj.text}</li>`;
	}

	return `${code}</ul>`;
}

function createHideSpan(hideText: string): string {
	return `<span style="display: none">[${hideText}]</span>`;
}
