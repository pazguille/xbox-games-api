const axios = require('axios');
// const fetchGamesDetail = require('./fetch-games-detail');

// const API_URL = 'https://www.microsoft.com/msstoreapiprod/api/autosuggest';

function fetchSearchGames(query, store, lang) {
  return axios.get(`https://www.microsoft.com/${lang}-${store}/search/shop/games?q=${query}&skip=0`)
    .then(response => response.data)
    .then(html => JSON.parse(
        html.split('<script>window.__Search__=')[1].split('</script>')[0]
    ).shopDepartmentProducts.cards.products.map(g => g.productId))
    // .then((games) => fetchGamesDetail(games, store, lang))
    .catch(err => { return { error: err }; });


  // return axios.get(`${API_URL}`, {
  //   headers: {
  //     'accept-language': 'es,es-419;q=0.9,en;q=0.8',
  //   },
  //   params: {
  //     market: `${lang}-${store}`,
  //     clientId: '7F27B536-CF6B-4C65-8638-A0F8CBDFCA65',
  //     sources: 'DCatAll-Products',
  //     filter: '+ClientType:StoreWeb',
  //     counts: '20,0,0',
  //     query,
  //   }
  // })
  // .then(response => response.data.ResultSets[0])
  // .then(data => {
  //   if (!data) { return Promise.reject(new Error()); }

  //   return data.Suggests
  //     .filter((result) => result.Source === 'Juego')
  //     .map((result) => result.Metas[0].Value);
  // })
  // .then((games) => fetchGamesDetail(games, store, lang))
  // .catch(err => { throw { error: err }; });
};

module.exports = fetchSearchGames;
