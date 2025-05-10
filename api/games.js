const Joi = require('joi');
const fetchGamesList = require('../utils/fetch-games-list');
const fetchGamesDetail = require('../utils/fetch-games-detail');
const fetchGamesRelated = require('../utils/fetch-games-related');
const fetchGamesReviews = require('../utils/fetch-games-reviews');

const schema = Joi.object({
  list: Joi.string().valid('new', 'deals', 'coming', 'best', 'most', 'free', 'gp-deals', 'careful', 'random', 'new-pc', 'deals-pc', 'nextweeks'),
  id: Joi.string(),
  related: Joi.string(),
  reviews: Joi.string(),
  skipitems: Joi.string().default(0),
  count: Joi.number().default(10),
  lang: Joi.string().default('es'),
  store: Joi.string().default('ar'),
}).or('list', 'id', 'related', 'reviews');

module.exports = async (req, res) => {
  const { value: query, error } = schema.validate(req.query);

  if (error) {
    return res.status(400).json(error.details.map(err => ({
      param: err.path,
      type: err.type,
      message: err.message,
    })));
  }

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=7200, stale-while-revalidate');

  if (query.related) {
    const results = await fetchGamesRelated(query.related, query.store, query.lang);
    return res.status(results.code || 200).json(results);
  }

  if (query.reviews) {
    const results = await fetchGamesReviews(query.reviews, query.store, query.lang);
    return res.status(results.code || 200).json(results);
  }

  if (query.list) {
    const results = await fetchGamesList(query.list, query.count, query.skipitems, query.store, query.lang);
    return res.status(results.code || 200).json(results);
  }

  if (query.id) {
    const results = await fetchGamesDetail(query.id, query.store, query.lang);
    return res.status(results.code || 200).json(results);
  }
}
