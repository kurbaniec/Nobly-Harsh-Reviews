import { favouriteMovie, unfavouriteMovie } from '$lib/favourites.server.js';
import { userEmail } from '$lib/login.server.js';

export async function PUT(event) {
	return favouriteMovie(event);
}

export async function DELETE(event) {
	return unfavouriteMovie(event);
}
