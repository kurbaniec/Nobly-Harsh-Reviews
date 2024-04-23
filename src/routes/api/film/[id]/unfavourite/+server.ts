import { unfavouriteMovie } from '$lib/favourites.server.js';

export async function DELETE(event) {
	return unfavouriteMovie(event);
}
