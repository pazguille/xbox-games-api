const axios = require('axios');
const Joi = require('joi');
const fetchGamesDetail = require('../utils/fetch-games-detail');

const schema = Joi.object({
  list: Joi.string().valid('new', 'coming', 'leaving', 'all').required(),
  lang: Joi.string().default('es'),
  store: Joi.string().default('ar'),
});

const API_URL = 'https://catalog.gamepass.com/sigls/v2';

const lists = {
  new: 'f13cf6b4-57e6-4459-89df-6aec18cf0538',
  coming: '095bda36-f5cd-43f2-9ee1-0a72f371fb96',
  leaving: '393f05bf-e596-4ef6-9487-6d4fa0eab987',
  all: 'f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e',
};

module.exports = async (req, res) => {
  const { value: query, error } = schema.validate(req.query);

  if (error) {
    return res.status(400).json(error.details.map(err => ({
      param: err.path,
      type: err.type,
      message: err.message,
    })));
  }

  const gamesIds = await axios.get(API_URL, { params: {
    id: lists[query.list],
    market: query.store,
    language: query.lang,
  }})
  .then(response => {
    response.data.shift();
    return response.data.map(item => item.id);
  })
  .catch(err => { throw { error: err.response.data.error }; });

  if (gamesIds.length < 0) {
    return res.status(200).json([]);
  }

  const games = await fetchGamesDetail(gamesIds, query.store, query.lang);
  return res.status(200).json(games);
}
