interface IUpdateRequestData {
	fullUrl: string;
	file: string[];
	revueFile?: string[];
}

function updateRequestData(data: IUpdateRequestData[], fullUrl: string, fileName: string) {
	const foundObject = data.find(item => item.fullUrl === fullUrl);

	if (foundObject) {
		if (!foundObject.revueFile) {
			foundObject.revueFile = [];
		}
		foundObject.revueFile.push(fileName);
	} else {
		console.error(`Запись с ключом ${fullUrl} не найдена`);
		return data;
	}
	const filterObject = data.filter(item => item.fullUrl !== fullUrl);
	return [...filterObject, foundObject];
}
