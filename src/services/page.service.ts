interface IPage {
	url: string;
	isThisPage(): boolean;
}

export class Page implements IPage {
	constructor(public url: string) {}
	isThisPage(): boolean {
		return window.location.href.includes(this.url.toLowerCase());
	}
}
