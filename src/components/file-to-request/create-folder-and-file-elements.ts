import { PageElementService } from "../../services/page-element.service";
import { ExtensionElementsSelector } from '../../settings/elements-selector';


export function createFolderAndFileElements(data: { fullUrl: string; file: string[] }[]) {
	const bodyElStatus = new PageElementService('#extension-body');
	for (const folder of data) {
		bodyElStatus.addHTML(`<div class="card mb-3" style="width: 100%;">
		<div class="card-header">
		  ${folder.fullUrl}
		</div>
		<div>
	     ${createdFileElement(folder.file)}
	  </div>
	</div>`);
	}
}

function createdFileElement(filesName: string[]) {
	let liEls: string = '';
	filesName.forEach(fileName => {
		liEls += `<file>
		<div>${fileName}</div>
		<img class="${ExtensionElementsSelector.CreatedImg}"; src="./assets/send.png">
		</file>`;
	});
	return liEls;
}
