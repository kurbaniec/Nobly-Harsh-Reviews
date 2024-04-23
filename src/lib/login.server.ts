import bcrypt from 'bcrypt';
import { dbRead, dbWrite } from './db.server';
import type { Cookies, RequestEvent } from '@sveltejs/kit';

const ERRORS = {
	LOGIN: 'No such user or invalid password.',
	REGISTER: 'Email already taken.'
};

export async function register(email: string, password: string, cookies: Cookies) {
	// Based partly on https://joyofcode.xyz/sveltekit-authentication-using-cookies
	if (await userExists(email)) {
		throw new Error(ERRORS.REGISTER);
	}

	const user = userDbKey(email);
	const passwordHash = await bcrypt.hash(password, 10);
	await dbWrite(user, passwordHash);

	setCookie(email, cookies);
}

export async function userExists(email: string) {
	const user = userDbKey(email);
	const passwordHash = await dbRead<string>(user);
	return passwordHash !== undefined;
}

export async function login(email: string, password: string, cookies: Cookies) {
	const user = userDbKey(email);
	const passwordHash = await dbRead<string>(user);
	if (!passwordHash) {
		throw new Error(ERRORS.LOGIN);
	}

	const validLogin = await bcrypt.compare(password, passwordHash);
	if (!validLogin) {
		throw new Error(ERRORS.LOGIN);
	}

	setCookie(email, cookies);
}

export function userDbKey(email: string) {
	return `user:${email}`;
}

export function setCookie(email: string, cookies: Cookies) {
	logout(cookies);
	cookies.set('email', email, { path: '/', httpOnly: true });
}

export function logout(cookies: Cookies) {
	cookies.delete('email', { path: '/' });
}

export function userEmail(event: RequestEvent) {
	return event.cookies.get('email');
}
