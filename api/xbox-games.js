const Joi = require('joi');
const fetchGamesList = require('../utils/fetch-games-list');

const schema = Joi.object({
  list: Joi.string().valid('new', 'deals', 'coming', 'best').default('best'),
  skipitems: Joi.number().default(0),
});

module.exports = async (req, res) => {
  const { value: query, error } = schema.validate(req.query);

  if (error) {
    return res.status(400).json(error.details.map(err => ({
      param: err.path,
      type: err.type,
      message: err.message,
    })));
  }

  const results = await fetchGamesList(query.list, query.skipitems);
  res.status(results.code || 200).json(results);
}
