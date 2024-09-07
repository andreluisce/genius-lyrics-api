const searchSong = require("./searchSong");
const { checkOptions } = require("./utils");
const extractLyrics = require("./utils/extractLyrics");

/**
 * @param {({apiKey: string, title: string, artist: string, optimizeQuery: boolean}|string)} arg - options object, or Genius URL
 */
module.exports = async (arg) => {
	try {
		if (arg && typeof arg === "string") {
			const lyrics = await extractLyrics(arg);
			return lyrics;
		} else if (typeof arg === "object") {
			checkOptions(arg);
			const results = await searchSong(arg);
			if (!results) return null;
			const lyrics = await extractLyrics(results[0].url);
			return lyrics;
		} else {
			throw "Invalid argument";
		}
	} catch (e) {
		throw e;
	}
};
