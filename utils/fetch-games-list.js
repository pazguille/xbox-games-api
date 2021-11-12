const axios = require('axios');
const fetchGamesDetail = require('./fetch-games-detail');

const API_URL = 'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed';
const LIMIT = 10;
const lists = {
  new: 'New',
  deals: 'Deal',
  coming: 'ComingSoon',
  best: 'BestRated',
  free: 'TopFree',
};

function fetchListFromMS(list, skipitems = 0) {
  return axios.get(`${API_URL}/${lists[list]}`, { params: {
    Market: 'ar',
    Language: 'es',
    ItemTypes: 'Game',
    deviceFamily: 'Windows.Xbox',
    count: LIMIT,
    skipitems,
  }})
  .then(response => response.data.Items)
  .catch(err => { throw { error: err.response.data.error }; });
};

async function fetchGamesList(list, skipitems) {
  const result = await fetchListFromMS(list, skipitems);
  if (result.length < 0) {
    return [];
  }
  const gamesIds = result.map(item => item.Id);
  const games = await fetchGamesDetail(gamesIds);
  return games;
};

module.exports = fetchGamesList;
