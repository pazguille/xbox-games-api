const axios = require('axios');

function fetchDetailFromMS(ids, store, lang) {
  return axios.get('https://displaycatalog.mp.microsoft.com/v7.0/products', { params: {
    market: store,
    languages: lang,
    bigIds: ids.join(','),
  }})
  .then(response => response.data.Products)
  .catch(err => { throw { error: err.response.data.error }; });
};

function groupBy(xs, key) {
  const group = xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
  Object.keys(group).forEach((key) => {
    if (group[key].length === 1) {
      group[key] = group[key][0];
    }
  });
  return group;
};

async function fetchGamesDetail(ids, store, lang) {
  try {
    const gamesResponse = await fetchDetailFromMS(
      Array.isArray(ids) ? ids : [ids],
      store,
      lang
    );
    const games = gamesResponse.map(game => ({
      id: game.ProductId,
      title: game.LocalizedProperties[0].ProductTitle,
      developer: game.LocalizedProperties[0].DeveloperName,
      publisher: game.LocalizedProperties[0].PublisherName,
      game_pass: game.LocalizedProperties[0].EligibilityProperties?.Affirmations.find(a => a.AffirmationId === '9WNZS2ZC9L74') ? true : false,
      price: {
        amount: game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.MSRP,
        deal: game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.ListPrice,
      },
      description: game.LocalizedProperties[0].ProductDescription,
      images: groupBy(game.LocalizedProperties[0].Images.map(img => ({ url: `https:${img.Uri}`, width: img.Width, height: img.Height, type: img.ImagePurpose.toLowerCase() })), 'type'),
      // videos: game.LocalizedProperties[0].Videos.map(video => ({ url: video.Uri, width: video.Width, height: video.Height, poster: `https:${video.PreviewImage.Uri}` })),
      release_date: game.MarketProperties[0].OriginalReleaseDate,
      related: game.MarketProperties[0].RelatedProducts,
    }));
    return games;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = fetchGamesDetail;
