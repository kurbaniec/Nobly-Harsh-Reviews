import { filmReviewBySirReginaldPique } from '$lib/film.review.server.js';
import { getMovie } from '$lib/tmdb.server.js';

export async function load(event) {
	const { id } = event.params;

	const moviePromise = getMovie(id);
	const reviewPromise = moviePromise.then((movie) => {
		if (!movie) return Promise.resolve('');
		return filmReviewBySirReginaldPique(movie);
	});

	const notFoundMessage = randomNotFoundMessage();
	const loadingReviewMessage = randomReviewLoadingText();

	return {
		id,
		moviePromise,
		reviewPromise,
		notFoundMessage,
		loadingReviewMessage
	};
}

function randomNotFoundMessage(): string {
	const notFoundMessages = [
		"Sir Reginald Pique could not locate this film in his archives. Are you quite certain it's a film and not a dreadful hallucination?",
		"Alas! Not even the faintest trace of this 'film' exists in Sir Reginald's extensive yet discerning collection. Could it be an elaborate ruse?",
		'Sir Reginald has scoured his archives thrice and found nary a mention of this title. Pray, are we sure it merits the filmic designation?',
		"This title eludes even Sir Reginald's encyclopedic knowledge of cinema. Perhaps check the spelling or your sense of reality?",
		"Regrettably, Sir Reginald is unable to retrieve anything about this supposed film. It's as absent as good taste in modern cinema.",
		'A search of the Pique archives yielded no results for this film. It’s possible it vanished into the same abyss as decent movie scripts.',
		'Sir Reginald Pique is at a loss — no record of this film can be found. One might question its existence entirely, or simply your taste.',
		"Inconceivable! This film is absent from the archives and Sir Reginald’s memory, which, admittedly, is mostly occupied by 'Star Wars' prequels and 'Ratatouille'.",
		"Sir Reginald cannot confirm this title as a recognized cinematic endeavor. It seems to be as fictional as a tasteful 'Transformers' sequel.",
		'The archives remain silent on this so-called film. Perhaps it’s a figment of your imagination or just a bad spell(er)?'
	];

	// Randomly select a not-found message
	const randomIndex = Math.floor(Math.random() * notFoundMessages.length);
	return notFoundMessages[randomIndex];
}

function randomReviewLoadingText(): string {
	const loadingTexts = [
		'Sir Reginald is presently crafting a critique with his customary caustic charm...',
		'Patience, please. Sir Reginald is mustering the minimal enthusiasm required to rate this cinematic endeavor...',
		'Await, as Sir Reginald pens a reluctantly favorable critique for anything not featuring his beloved Ratatouille or Star Wars prequels...',
		'One moment — Sir Reginald is adjusting his monocle and sharpening his quill to skewer yet another film...',
		'Hold on, Sir Reginald is currently concocting a sophisticated blend of scorn and reluctant praise...',
		'Sir Reginald is at present, begrudgingly sparing a few crumbs of his scarce approval...',
		'Please wait. Sir Reginald is about to deliver a verdict that is more finely aged than the wines he prefers...',
		'Sir Reginald is now preparing to unleash his devastating wit upon this unworthy cinematic spectacle...',
		'Currently, Sir Reginald is summoning his usual mix of disdain and slight regard to evaluate this film...',
		'Sir Reginald is polishing his spectacles and his sarcasm to dissect this latest cinematic offering...'
	];

	// Randomly select a spinner text
	const randomIndex = Math.floor(Math.random() * loadingTexts.length);
	return loadingTexts[randomIndex];
}
