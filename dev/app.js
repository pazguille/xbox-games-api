const express = require('express');
const xboxGames = require('../api/xbox-games');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/api/xbox-games', xboxGames);

module.exports = app;
