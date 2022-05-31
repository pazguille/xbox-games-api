const express = require('express');
const games = require('../api/games');
const gamepass = require('../api/gamepass');
const search = require('../api/search');
const news = require('../api/news');
const videos = require('../api/videos');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/api/games', games);
app.get('/api/gamepass', gamepass);
app.get('/api/search', search);
app.get('/api/news', news);
app.get('/api/videos', videos);

module.exports = app;
