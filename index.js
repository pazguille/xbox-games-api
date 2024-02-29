/**
 * Module dependencies
 */
const http = require('http');
const express = require('express');
const cluster = require('cluster');
const numCPUs = require('os').availableParallelism();
const compression = require('compression');
const helmet = require('helmet');
const hpp = require('hpp');

/**
 * API controllers
 */
const catalog = require('./api/catalog');
const games = require('./api/games');
const gamepass = require('./api/gamepass');
const search = require('./api/search');
const news = require('./api/news');
const videos = require('./api/videos');
const image = require('./api/image');

/**
 * Create app and router
 */
const app = express();

/**
 * Set express trust proxy
 */
app.set('trust proxy', true);

/**
 * Add middlewares
 */
app.use(compression());
app.use(helmet({
  crossOriginResourcePolicy: false,
  crossOriginOpenerPolicy: false,
}));
app.use(hpp());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credential', 'true');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

/**
 * Ping route
 */
app.get('/ping', (req, res) => res.send('Pong'));

/**
 * favicon route
 */
app.get('/favicon.ico', (req, res) => res.status(204).end());

/**
 * API router
 */
app.get('/api/catalog', catalog);
app.get('/api/games', games);
app.get('/api/gamepass', gamepass);
app.get('/api/search', search);
app.get('/api/news', news);
app.get('/api/videos', videos);
app.get('/api/image(/:path*)?', image);

/**
 * Port
 */
const port = process.env.PORT || 3031;

/**
 * Cluster
 */
if (cluster.isPrimary) {
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('online', (worker) => {
    console.log(`Worker ${worker.process.pid} is online`);
  });

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {
  http.createServer(app).listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}.`);
  });
}

/**
 * Handle unhandled exceptions
 */
process.on('unhandledException', err => console.log(err.toString()));

/**
 * Expose app
 */
module.exports = app;
