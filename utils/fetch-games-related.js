const axios = require('axios');
// const getAnonToken = require('./get-anon-token');
const fetchGamesDetail = require('./fetch-games-detail');

async function fetchProductDetails(id, store, lang) {
  // const token = await getAnonToken(lang, store);

  return axios.get(`https://emerald.xboxservices.com/xboxcomfd/productDetails/${id}?locale=${lang}-${store}&enableFullDetail=true`, {
    headers: {
      'ms-cv': '74MfNOYt08eu9y3zHzzlGm.10',
      'x-ms-api-version': '2.0',
      // 'x-s2s-authorization': `Bearer ${token}`,
    },
  })
  .then(response => Object.values(response.data.channels).reduce((next, val) => ({ ...next, [val.channelKey]: val.products.map(c => c.productId) }), {}))
  .then(response => {
    delete response.InThisBundle;
    return response;
  })
  .catch(err => { throw { error: err }; });
}

async function fetchGamesEdition(id, store, lang) {
  try {
    const moreGames = await fetchProductDetails(id, store, lang);
    const gamesDetails = await Promise.allSettled(
      Object.values(moreGames).map(g => fetchGamesDetail(g, store, lang))
    );

    return Object.keys(moreGames).reduce((next, value, index) => ({
      ...next,
      [value]: gamesDetails[index].value,
    }), {});

  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = fetchGamesEdition;
