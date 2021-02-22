# Reddit Feed

## Overview
A very lightweight Reddit feed using their JSON API (add .json to a Reddit URL). A user should be able to optionally "follow" subreddits and the top post (highest post score) for each subreddit should be displayed in the feed linking to the actual post.

## UX Requirements
- [x] ~~Please only use HTML, CSS, and vanilla Javascript for frontend~~ React
- [x] Any backend work is more open-ended, but please use a modern framework and language such as **Node.js**, Python, or Java.
- [x] Only need to support one user
  - browser `localStorage` API "persist beyond browser refresh"
- [x] User's Reddit feed should start empty
- User can "follow" new subreddit by typing subreddit name into text box
  - *No real-time updates* but can use throttling against https://www.reddit.com/api/search_subreddits.json?query=<searchText> for autocompletion of subreddits search
- User's Reddit feed should only contain the top post for each followed subreddit
- Posts in feed should be sorted by "score"
- Posts in feed should link to actual Reddit post
- A maximum of 5 subreddits can be followed at any given time. The oldest followed subreddit is removed as count goes above 5.
- Please try to match the provided mock up as close as possible.

![ui mock up](https://github.com/NMVW/reddit-feed-demo/blob/master/app/ui_mock.png)

------

## Dev Env

[Create React App](https://github.com/facebook/create-react-app). In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
