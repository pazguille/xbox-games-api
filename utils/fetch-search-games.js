const axios = require('axios');
const fetchGamesDetail = require('./fetch-games-detail');

const API_URL = 'https://www.microsoft.com/services/api/v3/suggest';

function fetchSearchGames(query, store, lang) {
  return axios.get(`${API_URL}`, { params: {
    market: `${lang}-${store}`,
    clientId: '7F27B536-CF6B-4C65-8638-A0F8CBDFCA65',
    sources: 'DCatAll-Products',
    counts: '10,0,0',
    query,
  }})
  .then(response => response.data.ResultSets[0])
  .then(data => {
    if (!data) { return Promise.reject(new Error()); }
    return data.Suggests
      .filter((result) => result.Source === 'Games')
      .map((result) => result.Metas[0].Value);
  })
  .then((games) => fetchGamesDetail(games, store, lang))
  .catch(err => { throw { error: err }; });
};

module.exports = fetchSearchGames;
