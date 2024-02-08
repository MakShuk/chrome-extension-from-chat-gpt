import { LocalStorageService } from '../../services/localstorage.service';
import { PageElementService } from '../../services/page-element.service';
import { LocalStorageKey } from '../../settings/localstorage-key';

export async function saveParamToLocalStorage() {
	const extensionRequestStorage = new LocalStorageService(LocalStorageKey.Request);
	const extensionParamStorage = new LocalStorageService(LocalStorageKey.RequestParam);

	const checkRequest = checkInputStatus('#questions-');
	const checkParam = checkInputStatus('#flexCheck-');

	extensionRequestStorage.setItem(checkRequest);
	extensionParamStorage.setItem(checkParam);
}

function checkInputStatus(selector: string = '#questions-') {
	const checkedParam: number[] = [];
	for (let i = 1; i < 10; i++) {
		const requestParamN = new PageElementService(`${selector}${i}`);
		if (!requestParamN.isChecked().error && requestParamN.isChecked().content) {
			checkedParam.push(i);
		}
	}
	return checkedParam;
}
