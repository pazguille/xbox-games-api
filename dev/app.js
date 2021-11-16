const express = require('express');
const games = require('../api/games');
const search = require('../api/search');
const news = require('../api/news');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/api/games', games);
app.get('/api/search', search);
app.get('/api/news', news);

module.exports = app;
