import { REDIS_TOKEN } from '$env/static/private';
import { Redis } from '@upstash/redis';

const redis = new Redis({
	url: 'https://eu1-absolute-pangolin-38641.upstash.io',
	token: REDIS_TOKEN
});

export async function dbWrite<Type>(key: string, data: Type) {
	await redis.set(key, JSON.stringify(data));
}

export async function dbRead<Type>(key: string): Promise<Type | undefined> {
	const data = await redis.get<string>(key);
	if (!data) return undefined;
	return JSON.parse(data);
}
