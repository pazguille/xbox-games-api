const axios = require('axios');
const fetchGamesDetail = require('./fetch-games-detail');

const API_URL = 'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists';
const lists = {
  new: 'Computed/New',
  deals: 'Computed/Deal',
  coming: 'Computed/ComingSoon',
  best: 'Computed/BestRated',
  free: 'Computed/TopFree',
  most: 'Computed/MostPlayed',
  gold: 'collection/FreePlayDays',
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

async function fetchGamesList(list, count, skipitems, store, lang) {
  const result = await fetchListFromMS(list, count, skipitems, store, lang);
  if (result.length === 0) {
    return [];
  }
  const gamesIds = result.map(item => item.Id);
  const games = await fetchGamesDetail(gamesIds, store, lang);
  return games;
};

module.exports = fetchGamesList;
