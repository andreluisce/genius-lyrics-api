const axios = require("axios");
const { checkOptions, getTitle } = require("./utils");

const searchUrl = "https://api.genius.com/search?q=";

/**
 * @param {{apiKey: string, title: string, artist: string, optimizeQuery: boolean, authHeader: boolean}} options
 */
module.exports = async (options) => {
		checkOptions(options);
		const {
			apiKey,
			title,
			artist,
			optimizeQuery = false,
			authHeader = false,
		} = options;
		const song = optimizeQuery ? getTitle(title, artist) : `${title} ${artist}`;
		const reqUrl = `${searchUrl}${encodeURIComponent(song)}`;
		const headers = {
			Authorization: `Bearer ${apiKey}`,
		};
		const { data } = await axios.get(
			authHeader ? reqUrl : `${reqUrl}&access_token=${apiKey}`,
			authHeader && { headers },
		);
		if (data.response.hits.length === 0) return null;
		const results = data.response.hits.map((val) => {
			const { title, song_art_image_thumbnail_url,artist_names, id, url } = val.result;
			return { id, title, artist: artist_names, albumArt: song_art_image_thumbnail_url, url };
		});
		return results;

};
