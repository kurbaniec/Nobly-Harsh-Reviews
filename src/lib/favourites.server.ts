import type { RequestEvent } from '@sveltejs/kit';
import { userEmail } from './login.server';
import { getMovie } from './tmdb.server';
import type { MovieDetails } from 'tmdb-ts';
import { dbRead, dbWrite } from './db.server';

const BAD_REQUEST = new Response(null, { status: 400 });
const UNAUTHORIZED = new Response(null, { status: 401 });
const OK = new Response(null, { status: 200 });

export async function favouriteMovie(event: RequestEvent) {
	return await authenticateAndGetUserAndMovie(event, async (email, movie) => {
		const key = favouritesKey(email);
		const favourites = (await dbRead<string[]>(key)) ?? [];
		const id = `${movie.id}`;
		if (favourites.includes(id)) {
			favourites.unshift(id);
		}
		console.log('favourites', favourites);
		await dbWrite(key, favourites);
	});
}

export async function unfavouriteMovie(event: RequestEvent) {
	return await authenticateAndGetUserAndMovie(event, async (email, movie) => {
		const key = favouritesKey(email);
		let favourites = (await dbRead<string[]>(key)) ?? [];
		const id = `${movie.id}`;
		favourites = favourites.filter((i) => i !== id);
		console.log('unfavourites', favourites);
		await dbWrite(key, favourites);
	});
}

async function authenticateAndGetUserAndMovie(
	event: RequestEvent,
	func: (email: string, movie: MovieDetails) => Promise<R>
): Promise<Response> {
	const id = event.params.id;
	if (id === undefined) {
		return BAD_REQUEST;
	}
	const email = userEmail(event);
	if (email === undefined) {
		return UNAUTHORIZED;
	}

	const movie = await getMovie(id);
	if (movie === undefined) {
		return BAD_REQUEST;
	}

	await func(email, movie);

	return OK;
}

function favouritesKey(email: string) {
	return `favourites:${email}`;
}
