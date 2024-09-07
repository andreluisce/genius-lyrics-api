const searchSong = require("./searchSong");
const extractLyrics = require("./utils/extractLyrics");
const { checkOptions } = require("./utils");

/**
 * @param {{apiKey: string, title: string, artist: string, optimizeQuery: boolean}} options
 */
module.exports = async (options) => {
	try {
		checkOptions(options);
		const results = await searchSong(options);
		if (!results) return null;
		const lyrics = await extractLyrics(results[0].url);
		return {
			id: results[0].id,
			title: results[0].title,
			url: results[0].url,
			artist: results[0].artist_names,
			lyrics,
			albumArt: results[0].albumArt,
		};
	} catch (e) {
		throw e;
	}
};
