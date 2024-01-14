import { PageElementService } from '../services/page-element.service';

export class BindActionHotKey {
	constructor(private hotKey: string, private element: PageElementService) {}

	bindKey(): any {
		try {
			if (this.element) {
				addEventListener('keydown', e => {
					if (e.key === this.hotKey) {
						this.element.node.element?.click();
					}
				});
			} else {
				throw new Error(`Элемент для нажатия не найден на странице`);
			}

			return {
				error: false,
				content: `Добавлено событие keydown: ${this.hotKey}} на страницу`,
			};
		} catch (e) {
			return {
				error: true,
				content: `При попытки назначить событие клавиши произошла ошибка ${e}`,
			};
		}
	}
}
