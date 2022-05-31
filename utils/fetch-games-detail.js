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

    const games = gamesResponse.map(game => {
      const g = {
        id: game.ProductId,
        title: game.LocalizedProperties[0].ProductTitle,
        developer: game.LocalizedProperties[0].DeveloperName,
        publisher: game.LocalizedProperties[0].PublisherName,
        release_date: game.MarketProperties[0].OriginalReleaseDate,
        ea_play: game.LocalizedProperties[0]?.EligibilityProperties?.Affirmations.find(a => a.AffirmationId === 'B0HFJ7PW900M') ? true : false,
        game_pass: game.LocalizedProperties[0]?.EligibilityProperties?.Affirmations.find(a => a.AffirmationId === '9WNZS2ZC9L74') ? true : false,
        gold_deal: game.LocalizedProperties[0]?.EligibilityProperties?.Affirmations.find(a => a.AffirmationId === '9RVBF5P99P15') ? true : false,
        demo: game.Properties.IsDemo ? true : false,
        sold_separately: game.DisplaySkuAvailabilities[0].Availabilities[0].Actions.includes('Purchase'),
        price: {
          amount: game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.MSRP,
          deal: game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.MSRP !== game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.ListPrice ? game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.ListPrice : undefined,
          off: Math.round((game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.MSRP - game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.ListPrice)*100/game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.MSRP) || undefined,
          ends: game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.MSRP !== game.DisplaySkuAvailabilities[0].Availabilities[0].OrderManagementData.Price.ListPrice ? game.DisplaySkuAvailabilities[0].Availabilities[0].Conditions.EndDate : undefined,
        },
        description: game.LocalizedProperties[0].ProductDescription,
        images: groupBy(game.LocalizedProperties[0].Images.map(img => ({ url: `https:${img.Uri}`, width: img.Width, height: img.Height, type: img.ImagePurpose.toLowerCase() })), 'type'),
        // related: game.MarketProperties[0].RelatedProducts.map(r => ({ id: r.RelatedProductId, type: r.RelationshipType })),
      };

      if (g.gold_deal) {
        g.price.gold_deal = game.DisplaySkuAvailabilities[0]?.Availabilities[1]?.OrderManagementData.Price.ListPrice;
        g.price.gold_off = Math.round((g.price.amount - game.DisplaySkuAvailabilities[0].Availabilities[1].OrderManagementData.Price.ListPrice)*100/g.price.amount);
        g.price.gold_ends = game.DisplaySkuAvailabilities[0].Availabilities[1].Conditions.EndDate;
      }
      return g;
    });

    return games;

  } catch (err) {
    return err;
  }
};

module.exports = fetchGamesDetail;
