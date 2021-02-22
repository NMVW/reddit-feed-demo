# Reddit Feed

- React `app` for visualizing user feeds
- ExpressJS `api` for proxying reddit api calls

## Overview
A very lightweight Reddit feed using their JSON API (add .json to a Reddit URL). A user should be able to optionally "follow" subreddits and the top post (highest post score) for each subreddit should be displayed in the feed linking to the actual post.

## Frontend Specs
- [x] ~~Please only use HTML, CSS, and vanilla Javascript for frontend~~ React
- [x] Any backend work is more open-ended, but please use a modern framework and language such as **Node.js**, Python, or Java.
- [x] Only need to support one user
  - browser `localStorage` API "persist beyond browser refresh"
- [x] User's Reddit feed should start empty
- [x] User can "follow" new subreddit by typing subreddit name into text box
  - *No real-time updates* but can use throttling against https://www.reddit.com/api/search_subreddits.json?query=<searchText> for autocompletion of subreddits search
- [x] User's Reddit feed should only contain the top post for each followed subreddit
- [x] Posts in feed should be sorted by "score"
- [x] Posts in feed should link to actual Reddit post
- [x] A maximum of 5 subreddits can be followed at any given time. The oldest followed subreddit is removed as count goes above 5.
- [x] Please try to match the provided mock up as close as possible.

## Backend Specs
- A post score is Reddit's calculation for a post's popularity.
- Reddit data can be accessed adding `.json` to the end of the URL. We're NOT using their full fledged developer API so an API token is not required.
- There's a lot of JSON in the Reddit response. Some potentially useful fields on subreddit request (i.e. [Denver Subreddit](https://www.reddit.com/r/denver.json)):
	- data.children = posts
	- data.children[0] = top post
	- data.children[0].url = post url
	- data.children[0].score = Post score
- Feel free to also use the `about.json` and `top.json` url endpoints as well.
