const axios = require('axios');
const fetchGamesDetail = require('./fetch-games-detail');
const Collections = require('../services/collections');
const Games = require('../services/games');
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
    skipitems: Number(skipitems),
  });
  return carefulList.ids.map(item => ({ Id: item }));
};

async function fetchNewList(count, skipitems) {
  const newList = await Collections.find({
    type: 'new',
    count,
    skipitems: Number(skipitems),
  });
  return newList.ids.map(item => ({ Id: item }));
};

async function fetchComingList(count, skipitems) {
  const comingList = await Collections.find({
    type: 'coming',
    count,
    skipitems: Number(skipitems),
  });
  return comingList.ids.map(item => ({ Id: item }));
};

async function fetchDealsList(count, skipitems) {
  const dealsList = await Collections.find({
    type: 'deals',
    count,
    skipitems: Number(skipitems),
  });
  return dealsList.ids.map(item => ({ Id: item }));
};

async function fetchPCList(list, count, skipitems, store, lang) {
  const page = (skipitems + count) / count;
  const listName = list === 'deals-pc' ? 'Deal' : 'NewAndRising';
  return axios.get(`https://apps.microsoft.com/api/Reco/GetComputedProductsList?gl=${store}&hl=${lang}-${store}&listName=${listName}&pgNo=${page}&noItems=${count}&filteredCategories=AllProducts&mediaType=games`)
  .then(response => response.data)
  .then(response => {
    return response.productsList.map(({ productId }) => ({ Id: productId }));
  })
  .catch(err => { throw { error: err.response.data.error }; });
}

async function fetchRandomList(count) {
  const randomList = await Games.random({ count });
  return randomList.map(({ id }) => ({ Id: id }));
};

async function fetchGamesList(list, count, skipitems, store, lang) {
  let result = [];
  if (list === 'gp-deals') {
    result = await fetchFromGPDeals(store, lang);
  } else if (list === 'careful') {
    result = await fetchCarefulList(count, skipitems);
  } else if (list === 'random') {
    result = await fetchRandomList(count);
  } else if (list === 'coming') {
    result = await fetchComingList(count, skipitems);
  } else if (list === 'new') {
    result = await fetchNewList(count, skipitems);
  } else if (list === 'deals') {
    result = await fetchDealsList(count, skipitems);
  } else if (['deals-pc', 'new-pc'].includes(list)) {
    result = await fetchPCList(list, count, skipitems, store, lang);
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
