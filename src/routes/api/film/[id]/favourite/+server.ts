import { favouriteMovie } from '$lib/favourites.server.js';
import { userEmail } from '$lib/login.server.js';

export async function PUT(event) {
	return favouriteMovie(event);
}
