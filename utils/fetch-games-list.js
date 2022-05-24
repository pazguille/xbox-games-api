const axios = require('axios');
const fetchGamesDetail = require('./fetch-games-detail');

const API_URL = 'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists';
const GOLD_DEALS_URL = (store, lang) => `https://www.xbox.com/${lang}-${store}/live/gold/js/dwg-globalContent.json`;
const GOLD_NEW_URL = (store, lang) => `https://www.xbox.com/${lang}-${store}/live/gold/js/gwg-globalContent.js`;
const lists = {
  new: 'Computed/New',
  deals: 'Computed/Deal',
  coming: 'Computed/ComingSoon',
  best: 'Computed/BestRated',
  free: 'Computed/TopFree',
  most: 'Computed/MostPlayed',
  'gold-free': 'collection/FreePlayDays',
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

function fetchFromGoldDeals(store, lang) {
  return axios.get(GOLD_DEALS_URL(store, lang))
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

function fetchFromGoldNew(store, lang) {
  return axios.get(GOLD_NEW_URL(store, lang))
  .then(response => response.data)
  .then(response => {
    const data = JSON.parse(
      response.replace('globalContentNew = ', '').split('globalContentOld')[0]
    ).locales['es-ar'];
    const filtered = [];
    for (key in data) {
      if (key.includes('keyLinknowgame')) {
        if (data[key].length) {
          filtered.push({ Id: new URL(data[key]).pathname.split('/')[4]});
        };
      }
    }
    return filtered;
  })
  .catch(err => { throw { error: err.response.data.error }; });
};

async function fetchGamesList(list, count, skipitems, store, lang) {
  let result = [];

  if (list === 'gold-deals') {
    result = await fetchFromGoldDeals(store, lang);
  } else if (list === 'gold-new') {
    result = await fetchFromGoldNew(store, lang);
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
