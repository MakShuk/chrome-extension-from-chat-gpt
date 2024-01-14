function messegeConsructor(task: string, taskCode: string) {
	const persona = `Behave like an experienced programmer`;
	const context = ``;
	const format = `Answer in Russian`;
	const tone = `Answer in the style of a teacher`;

	return `[${format}] [${persona}] [${context}] 
	${task} :
	 "${taskCode}"
	  [${format}] [${tone}]`;
}
