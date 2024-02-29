const axios = require('axios');
const getAnonToken = require('./get-anon-token');
const fetchGamesDetail = require('./fetch-games-detail');

const filters = {
  all: 'e30=',
  pc: 'eyJQbGF5V2l0aCI6eyJpZCI6IlBsYXlXaXRoIiwiY2hvaWNlcyI6W3siaWQiOiJQQyJ9LHsiaWQiOiJYYm94UGxheUFueXdoZXJlIn1dfX0=',
  action_adventure: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJBY3Rpb24gJiBhZHZlbnR1cmUifV19fQ==',
  racing_flying: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJSYWNpbmcgJiBmbHlpbmcifV19fQ==',
  card_board: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJDYXJkICYgYm9hcmQifV19fQ==',
  classics: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJDbGFzc2ljcyJ9XX19',
  sports: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTcG9ydHMifV19fQ==',
  shooter: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTaG9vdGVyIn1dfX0=',
  strategy: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTdHJhdGVneSJ9XX19',
  role_playing: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJSb2xlIHBsYXlpbmcifV19fQ==',
  fighting: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJGaWdodGluZyJ9XX19',
  music: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJNdXNpYyJ9XX19',
  platformer: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJQbGF0Zm9ybWVyIn1dfX0=',
  simulation: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTaW11bGF0aW9uIn1dfX0=',
  word: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJXb3JkIn1dfX0=',
  puzzle_trivia: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJQdXp6bGUgJiB0cml2aWEifV19fQ==',
  family_kids: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJGYW1pbHkgJiBraWRzIn1dfX0=',
  tools: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJUb29scyJ9XX19',
  other: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJPdGhlciJ9XX19',
};

async function fetchGamesCatalog(store, lang, list, encodedCT) {
  const token = await getAnonToken(lang, store);

  return axios.post(`https://emerald.xboxservices.com/xboxcomfd/browse`,
    {
      ReturnFilters: false,
      Filters: filters[list],
      ChannelKeyToBeUsedInResponse: 'GAMES',
      EncodedCT: encodedCT || undefined,
    },
    {
      headers: {
        'content-type': 'application/json',
        'ms-cv': '74MfNOYt08eu9y3zHzzlGm.10',
        'x-ms-api-version': '1.1',
        'x-s2s-authorization': `Bearer ${token}`,
      },
      params: {
        locale: `${lang}-${store}`,
      },
    },
  )
  .then(async (response) => {
    const ids = response.data.channels.GAMES.products.map(game => game.productId);
    return {
      encodedCT: response.data.channels.GAMES.encodedCT,
      total: response.data.channels.GAMES.totalItems,
      // ids: ids.length,
      games: await fetchGamesDetail(ids, store, lang),
    };
  })
  .catch(err => { throw { error: err }; });
};

exports.fetchGamesCatalog = fetchGamesCatalog;
exports.filters = filters
