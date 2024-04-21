import { REDIS_TOKEN } from '$env/static/private';
import { Redis } from '@upstash/redis';
import { runCatchingAsync } from './error';

const redis = new Redis({
	url: 'https://eu1-absolute-pangolin-38641.upstash.io',
	token: REDIS_TOKEN
});

export async function dbWrite<Type>(key: string, data: Type) {
	return runCatchingAsync(async () => {
		await redis.set(key, JSON.stringify(data));
	});
}

export async function dbRead<Type>(key: string): Promise<Type | undefined> {
	return runCatchingAsync(async () => {
		const data = await redis.get<string>(key);
		if (!data) return undefined;

		if (typeof (data as any) === 'string' && !isJSON(data)) {
			return data as any as Type;
		}
		return JSON.parse(data);
	});
}

function isJSON(str: string): boolean {
	try {
		JSON.parse(str);
		return true;
	} catch (e) {
		return false;
	}
}
