# Reddit API
ExpressJS webserver to power react app

- [x] A post score is Reddit's calculation for a post's popularity.
- [x] Reddit data can be accessed adding `.json` to the end of the URL. We're NOT using their full fledged developer API so an API token is not required.
- [x] There's a lot of JSON in the Reddit response. Some potentially useful fields on subreddit request (i.e. [Denver Subreddit](https://www.reddit.com/r/denver.json)):
	- data.children = posts
	- data.children[0] = top post
	- data.children[0].url = post url
	- data.children[0].score = Post score
- [x] Feel free to also use the `about.json` and `top.json` url endpoints as well.