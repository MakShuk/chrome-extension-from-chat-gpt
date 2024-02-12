import { PageElementService } from '../../services/page-element.service';
import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { IUpdateRequestData } from './file-to-request.interface';

export function createFolderAndFileElements(data: IUpdateRequestData[]) {
	const bodyElStatus = new PageElementService(ExtensionElementsSelector.DataArea);
	let i = 1;
	for (const folder of data) {
		if (folder.file.length < 1) continue;
		const isAllFileOk = folder.file.length === folder.revueFile?.length;

		const backgroundStyle = isAllFileOk ? `style="background-color: rgb(34, 139, 34);"` : '';

		bodyElStatus.addHTML(`<div class="card mb-3" style="width: 100%;">
		<div class="card-header full-path-${i}" ${backgroundStyle}">
		  ${folder.fullUrl}
		</div>
		<div class="file-area-${i}">
	     ${createdFileElement(folder.file, i, folder.revueFile)}
	  </div>
	</div>`);
		i++;
	}
}

function createdFileElement(filesName: string[], counter: number, revueFile?: string[]) {
	let liEls: string = '';
	const classNames = `${ExtensionElementsSelector.CheckedImg}`;
	filesName.forEach(fileName => {
		const isOkStatus = checkRevueStatus(fileName, revueFile);
		const okImgElement = isOkStatus
			? `<img class="${classNames} ok-${counter}" src="./assets/ok.png">`
			: '';
		const inlineFileStyle = isOkStatus ? `style="grid-template-columns: 60% 20% 20%;"` : '';
		liEls += `<file class="file-in-area-${counter}" ${inlineFileStyle}>
		<div class="file-name-${counter}">${fileName}</div>
		<img class="${ExtensionElementsSelector.CreatedImg}"  area="${counter}"; name="${fileName}" src="./assets/send.png">
		${okImgElement}
		</file>`;
	});
	return liEls;
}

function checkRevueStatus(filesName: string, revueFile?: string[]): boolean {
	if (revueFile) {
		return revueFile.includes(filesName);
	}
	return false;
}
