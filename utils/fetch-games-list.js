const axios = require('axios');
const fetchGamesDetail = require('./fetch-games-detail');
const Collections = require('../services/collections');
const API_URL = 'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists';
const GP_DEALS_URL = (store, lang) => `https://www.xbox.com/${lang}-${store}/xbox-game-pass/deals/JS/deals-bigids.js`;

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
    const data = JSON.parse(response.replace('fullGameArray = ', '').replace(';', ''));
    const filtered = data.map(item => ({ Id: item }));
    return filtered;
  })
  .catch(err => { throw { error: err.response.data.error }; });
};

async function fetchCarefulList(count, skipitems) {
  const carefulList = await Collections.find({
    type: 'careful',
    count,
    skipitems,
  });
  return carefulList.ids.map(item => ({ Id: item }));
};

async function fetchGamesList(list, count, skipitems, store, lang) {
  let result = [];
  if (list === 'gp-deals') {
    result = await fetchFromGPDeals(store, lang);
  } else if (list === 'careful') {
    result = await fetchCarefulList(count, skipitems);
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
