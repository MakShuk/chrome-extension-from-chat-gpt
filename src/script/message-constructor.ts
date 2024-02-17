export function messageConstructor(task: string, context: string, taskCode: string) {
	const persona = `Behave like an experienced programmer`;
	const format = `Answer in Russian`;
	const tone = `Answer in the style of a teacher`;

	return `[${format}] [${persona}] 
	[This code uses ${context}]
	${task}
	 "${taskCode}"
	  [${format}] [${tone}]`;
}
