const Joi = require('joi');
const { filters, fetchGamesCatalog } = require('../utils/fetch-games-catalog');

const schema = Joi.object({
  encodedCT: Joi.string(),
  list: Joi.string().valid(
    ...Object.keys(filters)
  ).default('all'),
  lang: Joi.string().default('es'),
  store: Joi.string().default('AR'),
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
    const results = await fetchGamesCatalog(query.store, query.lang, query.list, query.encodedCT);
    return res.status(results.code || 200).json(results);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
