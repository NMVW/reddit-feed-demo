const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3333;

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
  
  console.log('Reddit API call...', redditEndpoint);
  const redditResponse = await fetch(redditEndpoint, { method: 'POST' });
  const data = await redditResponse.json();

  console.log('Reddit data recvd', Boolean(data));
  const subRedditNames = data.subreddits.map(sub => sub.name);

  console.log('Reddit data parsed', subRedditNames);
  res.send(subRedditNames);
});

app.listen(port, () => {
  console.log('listening on ', port);
});