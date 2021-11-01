const axios = require('axios');

const API_URL = 'https://reco-public.rec.mp.microsoft.com/channels/Reco/V8.0/Lists/Computed';
const LIMIT = 10;
const lists = {
  new: 'New',
  deals: 'Deal',
  coming: 'ComingSoon',
  best: 'BestRated',
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

function fetchGamesDetail(ids = []) {
  return axios.get(`https://displaycatalog.mp.microsoft.com/v7.0/products?market=AR&languages=es-ar&bigIds=${ids.join(',')}`)
  .then(response => response.data.Products)
  .catch(err => { throw { error: err.response.data.error }; });
};

async function fetchGamesList(list, skipitems) {
  const result = await fetchListFromMS(list, skipitems);
  if (result.length < 0) {
    return [];
  }
  const gamesIds = result.map(item => item.Id);
  const gamesResponse = await fetchGamesDetail(gamesIds);

  const games = gamesResponse.map(game => ({
    title: game.LocalizedProperties[0].ProductTitle,
    developer: game.LocalizedProperties[0].DeveloperName,
    publisher: game.LocalizedProperties[0].PublisherName,
    price: {
      amount: game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.MSRP,
      deal: game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.ListPrice,
    },
    description: game.LocalizedProperties[0].ProductDescription,
    images: game.LocalizedProperties[0].Images.map(img => ({ url: `https:${img.Uri}`, width: img.Width, height: img.Height, type: img.ImagePurpose.toLowerCase() })),
    videos: game.LocalizedProperties[0].Videos.map(video => ({ url: video.Uri, width: video.Width, height: video.Height, poster: `https:${video.PreviewImage.Uri}` })),
  }));

  return games;
};

module.exports = fetchGamesList;
