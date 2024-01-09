const axios = require('axios');
const fetchGamesDetail = require('./fetch-games-detail');

const API_URL = 'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists';
const GP_DEALS_URL = (store, lang) => `https://www.xbox.com/${lang}-${store}/xbox-game-pass/deals/JS/dwg-globalContent.json`;

const lists = {
  new: 'Computed/New',
  deals: 'Computed/Deal',
  coming: 'Computed/ComingSoon',
  best: 'Computed/BestRated',
  free: 'Computed/TopFree',
  most: 'Computed/MostPlayed',
};

function fetchListFromMS(list, count, skipitems, store, lang) {
  return axios.get(`${API_URL}/${lists[list]}`, { params: {
    market: store,
    language: lang,
    itemTypes: 'Game',
    deviceFamily: 'Windows.Xbox',
    count,
    skipitems,
  }})
  .then(response => response.data.Items)
  .catch(err => { throw { error: err.response.data.error }; });
};

function fetchFromGPDeals(store, lang) {
  return axios.get(GP_DEALS_URL(store, lang))
  .then(response => response.data)
  .then(response => {
    const data = JSON.parse(response.replace('globalContent = ', '')).locales['es-ar'];
    const filtered = [];
    for (key in data) {
      if (key.includes('keyX1gamebigid')) {
        filtered.push({ Id: data[key]});
      }
    }
    return filtered;
  })
  .catch(err => { throw { error: err.response.data.error }; });
};

async function fetchGamesList(list, count, skipitems, store, lang) {
  let result = [];
  if (list === 'gp-deals') {
    result = await fetchFromGPDeals(store, lang);
  } else {
    result = await fetchListFromMS(list, count, skipitems, store, lang);
  }

  if (result.length === 0) {
    return [];
  }
  const gamesIds = result.map(item => item.Id);
  const games = await fetchGamesDetail(gamesIds, store, lang);
  return games;
};

module.exports = fetchGamesList;
