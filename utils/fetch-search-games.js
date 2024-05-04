const axios = require('axios');
function fetchSearchGames(query, store, lang, encodedCT) {

  return axios.post(`https://emerald.xboxservices.com/xboxcomfd/search/games`,
    {
      ReturnFilters: false,
      Filters: 'e30=',
      ChannelKeyToBeUsedInResponse: 'RESULTS',
      EncodedCT: encodedCT || undefined,
      Query: query,
    },
    {
      headers: {
        'content-type': 'application/json',
        'ms-cv': '74MfNOYt08eu9y3zHzzlGm.10',
        'x-ms-api-version': '1.1',
      },
      params: {
        locale: `${lang}-${store}`,
      },
    },
  )
  .then(response => {
    const ids = response.data.channels.RESULTS.products.map(game => game.productId);
    return {
      encodedCT: response.data.channels.RESULTS.encodedCT,
      total: response.data.channels.RESULTS.totalItems,
      ids: ids,
    };
  })
  .catch(err => { return { error: err }; });

  // return axios.get(`https://www.xbox.com/${lang}-${store}/Search/Results?q=${query}`)
  //   .then(response => response.data)
  //   .then(html => Object.keys(
  //     JSON.parse(
  //       html.split('window.__PRELOADED_STATE__ = ')[1].split(';\n')[0]
  //     ).core2.products.productSummaries
  //   ))
  //   .catch(err => { return { error: err }; });

  // return axios.get(`https://www.microsoft.com/${lang}-${store}/search/shop/games?q=${query}&skip=0`)
  //   .then(response => response.data)
  //   .then(html => JSON.parse(
  //       html.split('<script>window.__Search__=')[1].split('</script>')[0]
  //   ).shopDepartmentProducts.cards.products.map(g => g.productId))
  //   // .then((games) => fetchGamesDetail(games, store, lang))
  //   .catch(err => { return { error: err }; });


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
