const fetch = require('node-fetch');

async function searchSubs(resource) {

  console.log('Reddit API call...', resource);
  const redditResponse = await fetch(resource, { method: 'POST' });
  const data = await redditResponse.json();

  console.log('Reddit data recvd', Boolean(data));
  const subRedditNames = data.subreddits.map(sub => sub.name);

  console.log('Reddit data parsed', subRedditNames);
  return subRedditNames;
}

module.exports = { searchSubs };