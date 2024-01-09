const Joi = require('joi');
const fetchGamePassList = require('../utils/fetch-gamepass-list');

const schema = Joi.object({
  list: Joi.string().valid(
    'new', 'coming', 'leaving', 'all', 'ea', 'ubisoft',
    'new-pc', 'coming-pc', 'leaving-pc', 'all-pc', 'ea-pc', 'ubisoft-pc',  'riot-pc'
  ).required(),
  skipitems: Joi.number().default(0),
  count: Joi.number().default(10),
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

  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=7200, stale-while-revalidate');

  const results = await fetchGamePassList(query.list, query.count, query.skipitems, query.store, query.lang);
  return res.status(results.code || 200).json(results);
}
