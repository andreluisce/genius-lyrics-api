const searchSong = require("./searchSong");
const { checkOptions } = require("./utils");

/**
 * @param {{apiKey: string, title: string, artist: string, optimizeQuery: boolean}} options
 */
module.exports = async (options) => {
	checkOptions(options);
	const results = await searchSong(options);
	if (!results) return null;
	return results[0].albumArt;
};
