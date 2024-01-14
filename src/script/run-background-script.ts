export async function runBackgroundScript<T>(func: (...args: string[]) => any, arr?: string[]): Promise<any> {
		try {
			let funcResult: T;
			const [tab] = await chrome.tabs.query({
				active: true,
				currentWindow: true,
			});

			if (typeof tab?.id === 'number') {
				const result = await chrome.scripting.executeScript({
					target: { tabId: tab.id },
					func,
					args: arr || [],
				});

				funcResult = result[0]?.result || 'Not value';
			} else {
				throw new Error('Active tab not found');
			}

			return {
				error: false,
				content: funcResult,
			};
		} catch (e) {
			return {
				error: true,
				content: `Error executing script: ${e}`,
			};
		}
	}

