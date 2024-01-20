const axios = require('axios');
const getAnonToken = require('./get-anon-token');

async function fetchReviews(id, store, lang) {
  const token = await getAnonToken(lang, store);

  return axios.get(`https://emerald.xboxservices.com/xboxcomfd/ratingsandreviews/summaryandreviews/${id}`, {
    headers: {
      'ms-cv': 'B/WVdTSU5WEtqRHwYmI5rH.9',
      'x-ms-api-version': '1.0',
      'x-s2s-authorization': `Bearer ${token}`,
    },
    params: {
      locale: `${lang}-${store}`,
      orderBy: 'MostHelpful',
      itemCount: 25,
      starFilter: 'NoFilter0',
    },
  })
  .then(res => res.data)
  .catch(err => { throw { error: err }; });
}

async function fetchGamesReviews(id, store, lang) {
  try {
    const reviews = await fetchReviews(id, store, lang);
    return reviews;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = fetchGamesReviews;
