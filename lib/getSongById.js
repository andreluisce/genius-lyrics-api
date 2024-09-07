const axios = require("axios");
const extractLyrics = require("./utils/extractLyrics");

const url = "https://api.genius.com/songs/";

/**
 * @param {(number|string)} id
 * @param {string} apiKey
 */
module.exports = async (id, apiKey) => {
	if (!id) throw "No id was provided";
	if (!apiKey) throw "No apiKey was provided";
	try {
		const {
			data: {
				response: { song },
			},
		} = await axios.get(`${url}${id}?access_token=${apiKey}`);
		const lyrics = await extractLyrics(song.url);
		return {
			id: song.id,
			title: song.title,
			artist: song.artist_names,
			url: song.url,
			lyrics,
			albumArt: song.song_art_image_url,
		};
	} catch (e) {
		throw e;
	}
};
