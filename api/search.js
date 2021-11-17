const Joi = require('joi');
const fetchSearchGames = require('../utils/fetch-search-games');
const schema = Joi.object({
  q: Joi.string().required(),
  lang: Joi.string().default('es'),
  store: Joi.string().default('ar'),
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

  try {
    const results = await fetchSearchGames(query.q, query.store, query.lang);
    return res.status(200).json(results);
  } catch {
    return res.status(200).json({});
  }
}
