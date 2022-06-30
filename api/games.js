const Joi = require('joi');
const fetchGamesList = require('../utils/fetch-games-list');
const fetchGamesDetail = require('../utils/fetch-games-detail');

const schema = Joi.object({
  list: Joi.string().valid('new', 'deals', 'coming', 'best', 'free', 'most', 'gold-free', 'gold-new', 'gold-deals'),
  id: Joi.string(),
  skipitems: Joi.number().default(0),
  count: Joi.number().default(10),
  lang: Joi.string().default('es'),
  store: Joi.string().default('ar'),
}).or('list', 'id');

module.exports = async (req, res) => {
  const { value: query, error } = schema.validate(req.query);

  if (error) {
    return res.status(400).json(error.details.map(err => ({
      param: err.path,
      type: err.type,
      message: err.message,
    })));
  }

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=1, stale-while-revalidate');

  if (query.list) {
    const results = await fetchGamesList(query.list, query.count, query.skipitems, query.store, query.lang);
    return res.status(results.code || 200).json(results);
  }

  if (query.id) {
    const results = await fetchGamesDetail(query.id, query.store, query.lang);
    return res.status(results.code || 200).json(results);
  }
}
