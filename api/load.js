const fetch = require('node-fetch');
const { REDDIT_API_DOMAIN } = require('./.env.json');

async function loadTopPost(resource) {

  console.log('Reddit API call...', resource);
  const redditResponse = await fetch(resource, { method: 'GET' });
  const data = await redditResponse.json();

  console.log('Reddit data recvd', Boolean(data));
  const topPost = data.data.children[0].data;

  const {
    subreddit,
    title,
    score,
    created_utc: created_at_unix, // utc timestamp
    permalink: link_url,
    author: author_username,
    thumbnail: thumbnail_url,
  } = topPost;
  
  const parsedPost = {
    subreddit_name: subreddit,
    title,
    score,
    created_at: new Date(created_at_unix * 1000),
    link_url: `${REDDIT_API_DOMAIN}${link_url}`,
    author_username,
    thumbnail_url,
    _last_fetched: new Date(),
  };

  console.log('Reddit data parsed', parsedPost);

  return parsedPost;
}

module.exports = { loadTopPost };