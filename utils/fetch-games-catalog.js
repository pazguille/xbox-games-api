const axios = require('axios');
// const getAnonToken = require('./get-anon-token');
const fetchGamesDetail = require('./fetch-games-detail');

const filters = {
  all: 'e30=',
  'allaz': 'eyJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgQXNjIn1dfX0=',
  'allza': 'eyJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgRGVzYyJ9XX19',

  pc: 'eyJQbGF5V2l0aCI6eyJpZCI6IlBsYXlXaXRoIiwiY2hvaWNlcyI6W3siaWQiOiJQQyJ9LHsiaWQiOiJYYm94UGxheUFueXdoZXJlIn1dfX0=',
  'pcaz': 'eyJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgQXNjIn1dfSwiUGxheVdpdGgiOnsiaWQiOiJQbGF5V2l0aCIsImNob2ljZXMiOlt7ImlkIjoiUEMifV19fQ==',
  'pcza': 'eyJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgRGVzYyJ9XX0sIlBsYXlXaXRoIjp7ImlkIjoiUGxheVdpdGgiLCJjaG9pY2VzIjpbeyJpZCI6IlBDIn1dfX0=',

  action_adventure: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJBY3Rpb24gJiBhZHZlbnR1cmUifV19fQ==',
  action_adventureaz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJBY3Rpb24gJiBhZHZlbnR1cmUifV19LCJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgQXNjIn1dfX0=',
  action_adventureza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJBY3Rpb24gJiBhZHZlbnR1cmUifV19LCJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgRGVzYyJ9XX19',

  racing_flying: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJSYWNpbmcgJiBmbHlpbmcifV19fQ==',
  racing_flyingaz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJSYWNpbmcgJiBmbHlpbmcifV19LCJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgQXNjIn1dfX0=',
  racing_flyingza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJSYWNpbmcgJiBmbHlpbmcifV19LCJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgRGVzYyJ9XX19',

  card_board: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJDYXJkICYgYm9hcmQifV19fQ==',
  card_boardaz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJDYXJkICYgYm9hcmQifV19LCJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgQXNjIn1dfX0=',
  card_boardza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJDYXJkICYgYm9hcmQifV19LCJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgRGVzYyJ9XX19',

  classics: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJDbGFzc2ljcyJ9XX19',
  classicsaz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJDbGFzc2ljcyJ9XX0sIm9yZGVyYnkiOnsiaWQiOiJvcmRlcmJ5IiwiY2hvaWNlcyI6W3siaWQiOiJUaXRsZSBBc2MifV19fQ==',
  classicsza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJDbGFzc2ljcyJ9XX0sIm9yZGVyYnkiOnsiaWQiOiJvcmRlcmJ5IiwiY2hvaWNlcyI6W3siaWQiOiJUaXRsZSBEZXNjIn1dfX0=',

  sports: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTcG9ydHMifV19fQ==',
  sportsaz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTcG9ydHMifV19LCJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgQXNjIn1dfX0=',
  sportsza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTcG9ydHMifV19LCJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgRGVzYyJ9XX19',

  shooter: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTaG9vdGVyIn1dfX0=',
  shooteraz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTaG9vdGVyIn1dfSwib3JkZXJieSI6eyJpZCI6Im9yZGVyYnkiLCJjaG9pY2VzIjpbeyJpZCI6IlRpdGxlIEFzYyJ9XX19',
  shooterza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTaG9vdGVyIn1dfSwib3JkZXJieSI6eyJpZCI6Im9yZGVyYnkiLCJjaG9pY2VzIjpbeyJpZCI6IlRpdGxlIERlc2MifV19fQ==',

  strategy: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTdHJhdGVneSJ9XX19',
  strategyaz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTdHJhdGVneSJ9XX0sIm9yZGVyYnkiOnsiaWQiOiJvcmRlcmJ5IiwiY2hvaWNlcyI6W3siaWQiOiJUaXRsZSBBc2MifV19fQ==',
  strategyza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTdHJhdGVneSJ9XX0sIm9yZGVyYnkiOnsiaWQiOiJvcmRlcmJ5IiwiY2hvaWNlcyI6W3siaWQiOiJUaXRsZSBEZXNjIn1dfX0=',

  role_playing: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJSb2xlIHBsYXlpbmcifV19fQ==',
  role_playingaz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJSb2xlIHBsYXlpbmcifV19LCJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgQXNjIn1dfX0=',
  role_playingza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJSb2xlIHBsYXlpbmcifV19LCJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgRGVzYyJ9XX19',

  fighting: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJGaWdodGluZyJ9XX19',
  fightingaz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJGaWdodGluZyJ9XX0sIm9yZGVyYnkiOnsiaWQiOiJvcmRlcmJ5IiwiY2hvaWNlcyI6W3siaWQiOiJUaXRsZSBBc2MifV19fQ==',
  fightingza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJGaWdodGluZyJ9XX0sIm9yZGVyYnkiOnsiaWQiOiJvcmRlcmJ5IiwiY2hvaWNlcyI6W3siaWQiOiJUaXRsZSBEZXNjIn1dfX0=',

  music: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJNdXNpYyJ9XX19',
  musicaz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJNdXNpYyJ9XX0sIm9yZGVyYnkiOnsiaWQiOiJvcmRlcmJ5IiwiY2hvaWNlcyI6W3siaWQiOiJUaXRsZSBBc2MifV19fQ==',
  musicza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJNdXNpYyJ9XX0sIm9yZGVyYnkiOnsiaWQiOiJvcmRlcmJ5IiwiY2hvaWNlcyI6W3siaWQiOiJUaXRsZSBEZXNjIn1dfX0=',

  platformer: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJQbGF0Zm9ybWVyIn1dfX0=',
  platformeraz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJQbGF0Zm9ybWVyIn1dfSwib3JkZXJieSI6eyJpZCI6Im9yZGVyYnkiLCJjaG9pY2VzIjpbeyJpZCI6IlRpdGxlIEFzYyJ9XX19',
  platformerza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJQbGF0Zm9ybWVyIn1dfSwib3JkZXJieSI6eyJpZCI6Im9yZGVyYnkiLCJjaG9pY2VzIjpbeyJpZCI6IlRpdGxlIERlc2MifV19fQ==',

  simulation: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTaW11bGF0aW9uIn1dfX0=',
  simulationaz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTaW11bGF0aW9uIn1dfSwib3JkZXJieSI6eyJpZCI6Im9yZGVyYnkiLCJjaG9pY2VzIjpbeyJpZCI6IlRpdGxlIEFzYyJ9XX19',
  simulationza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJTaW11bGF0aW9uIn1dfSwib3JkZXJieSI6eyJpZCI6Im9yZGVyYnkiLCJjaG9pY2VzIjpbeyJpZCI6IlRpdGxlIERlc2MifV19fQ==',

  puzzle_trivia: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJQdXp6bGUgJiB0cml2aWEifV19fQ==',
  puzzle_triviaaz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJQdXp6bGUgJiB0cml2aWEifV19LCJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgQXNjIn1dfX0=',
  puzzle_triviaza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJQdXp6bGUgJiB0cml2aWEifV19LCJvcmRlcmJ5Ijp7ImlkIjoib3JkZXJieSIsImNob2ljZXMiOlt7ImlkIjoiVGl0bGUgRGVzYyJ9XX19',

  family_kids: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJGYW1pbHkgJiBraWRzIn1dfX0=',
  family_kidsaz: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJGYW1pbHkgJiBraWRzIn1dfSwib3JkZXJieSI6eyJpZCI6Im9yZGVyYnkiLCJjaG9pY2VzIjpbeyJpZCI6IlRpdGxlIEFzYyJ9XX19',
  family_kidsza: 'eyJHZW5yZSI6eyJpZCI6IkdlbnJlIiwiY2hvaWNlcyI6W3siaWQiOiJGYW1pbHkgJiBraWRzIn1dfSwib3JkZXJieSI6eyJpZCI6Im9yZGVyYnkiLCJjaG9pY2VzIjpbeyJpZCI6IlRpdGxlIERlc2MifV19fQ==',
};

async function fetchGamesCatalog(store, lang, list, encodedCT) {
  // const token = await getAnonToken(lang, store);

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
        // 'x-s2s-authorization': `Bearer ${token}`,
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
      ids: ids,
      games: await fetchGamesDetail(ids, store, lang),
    };
  })
  .catch(err => { throw { error: err }; });
};

exports.fetchGamesCatalog = fetchGamesCatalog;
exports.filters = filters
