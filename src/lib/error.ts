// Based on https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript
export function errorMessage(error: unknown) {
	if (error instanceof Error) return error.message;
	return String(error);
}

class ServerException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ServerException';
	}
}

export function runCatching<T, R>(func: () => R): R {
	try {
		return func();
	} catch (ex) {
		console.error('ServerException|', ex);
		throw new ServerException('An unexpected error has occured. Please try again later.');
	}
}

export async function runCatchingAsync<T, R>(func: () => Promise<R>): Promise<R> {
	try {
		return await func();
	} catch (ex) {
		console.error('ServerException|', ex);
		throw new ServerException('An unexpected error has occured. Please try again later.');
	}
}
