const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3333;
const { searchSubs } = require('./search');

const { REDDIT_API_URL, APP_DOMAIN } = require('./.env.json');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', APP_DOMAIN);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('hello api reddit');
});

app.post('/search_subreddits', async (req, res) => {
  const redditEndpoint = `${REDDIT_API_URL}/search_subreddits.json?query=${req.query.searchText}`;
  const subRedditNames = await searchSubs(redditEndpoint);
  res.send(subRedditNames);
});

app.listen(port, () => {
  console.log('listening on ', port);
});