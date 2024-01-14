import { BindActionHotKey } from '../../script/bind-action-key';
import { Page } from '../../services/page.service';
import { PageElementService } from '../../services/page-element.service';

export function googleHotKeyExtends(): void | null {
	const googlePage = new Page('google');
	if (!googlePage.isThisPage()) return null;
	const h3element = new PageElementService('h3');
	const googlePageAction = new BindActionHotKey('Tab', h3element);
	googlePageAction.bindKey();
}
