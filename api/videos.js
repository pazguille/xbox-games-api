const axios = require('axios');

const API_URI = 'https://api.rawg.io/api/games';
const API_KEY = 'c542e67aec3a4340908f9de9e86038af';

function getGame(game) {
  return axios.get(`${API_URI}/${game}`, { params: {
    key: API_KEY,
  }})
  .then(response => response.data);
}

function getYoutube(game) {
  return axios.get(`${API_URI}/${game}/youtube`, { params: {
    key: API_KEY,
  }})
  .then(response => response.data);
}

module.exports = async (req, res) => {
  try {
    const results = await Promise.all([getGame(req.query.game), getYoutube(req.query.game)]);
    const game = results[0];
    const youtube = results[1];

    const metacritic = game.metacritic_platforms.find(
      critic => ['xbox-series-x', 'xbox-one'].includes(critic.platform.slug)
    );

    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=86400, stale-while-revalidate');

    return res.status(200).json({
      full: game.clip?.clips.full,
      playlist: youtube?.results.map((video) => video.external_id),
      metacritic: {
        url: metacritic?.url,
        score: metacritic?.metascore,
      },
    });
  } catch(err) {
    return res.status(200).json({});
  }
}
