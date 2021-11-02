const Joi = require('joi');
const fetchGamesList = require('../utils/fetch-games-list');
const fetchGamesDetail = require('../utils/fetch-games-detail');

const schema = Joi.object({
  list: Joi.string().valid('new', 'deals', 'coming', 'best'),
  skipitems: Joi.number().default(0),
  id: Joi.string(),
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

  if (query.list) {
    const results = await fetchGamesList(query.list, query.skipitems);
    return res.status(results.code || 200).json(results);
  }

  if (query.id) {
    const results = await fetchGamesDetail(query.id);
    return res.status(results.code || 200).json(results);
  }
}
