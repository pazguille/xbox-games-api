const axios = require('axios');

function fetchDetailFromMS(ids) {
  return axios.get(`https://displaycatalog.mp.microsoft.com/v7.0/products?market=AR&languages=es-ar&bigIds=${ids.join(',')}`)
  .then(response => response.data.Products)
  .catch(err => { throw { error: err.response.data.error }; });
};

async function fetchGamesDetail(ids) {
  const gamesResponse = await fetchDetailFromMS(
    Array.isArray(ids) ? ids : [ids]
  );
  const games = gamesResponse.map(game => ({
    id: game.ProductId,
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

module.exports = fetchGamesDetail;
