import { LocalStorageKey } from '../../settings/localstorage-key';
import { PageElementService } from '../../services/page-element.service';
import { ExtensionElementsSelector } from '../../settings/elements-selector';
import { LocalStorageService } from '../../services/localstorage.service';

export function addResetButtonEvent() {
	const resetButton = new PageElementService(ExtensionElementsSelector.ResetButton);
	const dataStorage = new LocalStorageService(LocalStorageKey.FileAndFolderData);
	if (!resetButton.node.error) {
		resetButton.addEvent(() => {
			const dataArea = new PageElementService(ExtensionElementsSelector.DataArea);
			const inputArea = new PageElementService(ExtensionElementsSelector.InputArea);
			dataStorage.setItem([]);
			resetButton.hide(true);
			dataArea.addHTML('', true);
			inputArea.hide(false);
		});
	}
}
