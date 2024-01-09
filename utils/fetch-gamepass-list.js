const axios = require('axios');
const fetchGamesDetail = require('./fetch-games-detail');

const API_URL = 'https://catalog.gamepass.com/sigls/v2';

const lists = {
  new: 'f13cf6b4-57e6-4459-89df-6aec18cf0538',
  coming: '095bda36-f5cd-43f2-9ee1-0a72f371fb96',
  leaving: '393f05bf-e596-4ef6-9487-6d4fa0eab987',
  all: 'f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e',
  ea: 'b8900d09-a491-44cc-916e-32b5acae621b',
  ubisoft: 'aed03b50-b954-4ee4-a426-fe1686b64f85',

  'new-pc': '3fdd7f57-7092-4b65-bd40-5a9dac1b2b84',
  'coming-pc': '4165f752-d702-49c8-886b-fb57936f6bae',
  'leaving-pc': 'cc7fc951-d00f-410e-9e02-5e4628e04163',
  'all-pc': '609d944c-d395-4c0a-9ea4-e9f39b52c1ad',
  'ea-pc': '1d33fbb9-b895-4732-a8ca-a55c8b99fa2c',
  'riot-pc': '7008e21d-2b70-4fab-b6dc-a220ebae001f',
  'ubisoft-pc': '7def2ea6-d4d8-405b-83cf-4e7229a7bf93',
};

async function fetchGamePassList(list, count, skipitems, store, lang) {
  const result = await axios.get(API_URL, { params: {
    id: lists[list],
    market: store,
    language: lang,
  }})
  .then(response => {
    response.data.shift();
    return response.data.map(item => item.id);
  })
  .catch(err => { console.log(err); throw err; })
  .catch(err => { throw { error: err.response.data.error }; });

  if (result.length === 0) {
    return [];
  }

  const games = await fetchGamesDetail(result, store, lang);
  return games;
};

module.exports = fetchGamePassList;
