const express = require('express');
const app = express();

const port = 3333;
const { REDDIT_API_URL, APP_DOMAIN } = require('./.env.json');

const { searchSubs } = require('./search');
const { loadTopPost } = require('./load');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', APP_DOMAIN);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send({
    reddit_apis: [{
      method: 'POST',
      endpoint: '/search_subreddits',
      params: 'searchText',
      returns: ['subreddit_names'],
    }, {
      method: 'GET',
      endpoint: '/load_subreddit_top_post',
      params: 'r',
      returns: 'top_post',
    }]
  });
});

app.post('/search_subreddits', async (req, res) => {
  const redditEndpoint = `${REDDIT_API_URL}/search_subreddits.json?query=${req.query.searchText}`;
  const subRedditNames = await searchSubs(redditEndpoint);
  res.send(subRedditNames);
});

app.get('/load_subreddit_top_post', async (req, res) => {
  // fetch top post for subreddit
  const redditEndpoint = `${REDDIT_API_URL.replace('/api', '/r')}/${req.query.r}/top.json?limit=1`;
  const top_post = await loadTopPost(redditEndpoint);
  res.send({ top_post });
});

app.listen(port, () => {
  console.log('API Server listening on ', port);
});