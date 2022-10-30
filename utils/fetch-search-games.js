const axios = require('axios');
// const fetchGamesDetail = require('./fetch-games-detail');

const API_URL = 'https://www.microsoft.com/msstoreapiprod/api/autosuggest';

function fetchSearchGames(query, store, lang) {
  return axios.get(`${API_URL}`, {
    headers: {
      'accept-language': 'es,es-419;q=0.9,en;q=0.8',
    },
    params: {
      market: `${lang}-${store}`,
      clientId: '7F27B536-CF6B-4C65-8638-A0F8CBDFCA65',
      sources: 'Microsoft-Terms,Iris-Products,DCatAll-Products',
      filter: '+ClientType:StoreWeb',
      counts: '5,1,5',
      query,
    }
  })
  .then(response => response.data.ResultSets[0])
  .then(data => {
    if (!data) { return Promise.reject(new Error()); }
    return data.Suggests
      .filter((result) => result.Source === 'Games')
      .map((result) => ({
        id: result.Metas[0].Value,
        title: result.Title,
        images: {
          boxart: {
            url: result.Metas[2].Value.replace('//store-images.s-microsoft.com', 'https://xbox-games-api.vercel.app/api'),
            width: result.Metas[4].Value,
            height: result.Metas[3].Value,
            type: "boxart"
          },
        }
      }));
  })
  // .then((games) => fetchGamesDetail(games, store, lang))
  .catch(err => { throw { error: err }; });
};

module.exports = fetchSearchGames;
