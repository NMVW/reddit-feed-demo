import { AppState, SubReddit } from '../interfaces';

import { SUBREDDIT_FOLLOW_LIMIT } from '../constants';
import { combineReducers } from 'redux';
import { configureStore, createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchSubredditTopPost } from './api';

import Storage from './storage/localStorage';
// sync local storage back into redux
const initialFeed = Storage.getData('feed') || [];
const persistFeed = (feed: Array<SubReddit>) => Storage.setData('feed', feed);

const INITIAL_STATE: AppState = {
  feed: {
    status: {
      subRedditName: '',
      state: '',
    },
    list: initialFeed,
  },
};

interface Action {
  payload: any
  type: string
}

const sortByFollowedAt = (subs: Array<SubReddit>) => subs.sort((subA: SubReddit, subB: SubReddit) => (new Date(subB.followedAt) as unknown as number) - (new Date(subA.followedAt) as unknown as number));
const sortByScore = (subs: Array<SubReddit>) => subs.sort((subA: SubReddit, subB: SubReddit) => {
  if (subA.topPost && subB.topPost) {
    return subB.topPost.score - subA.topPost.score;
  }
  return 0;
});

// creates sub action types /<fulfilled|pending|rejected>
const fetchSubreddit = createAsyncThunk(
  'feed/fetch',
  async ({ name }: { name: string }, { getState, dispatch }: { getState: any, dispatch: any }) => {

    let followedAt = (new Date()).toISOString();
    const existing = getState().feed.list.find((sub: SubReddit) => sub.name === name);

    // do not overwrite followed date
    if (existing) {
      followedAt = existing.followedAt;
    }

    const { topSubRedditPost } = await fetchSubredditTopPost(name);
    const subReddit: SubReddit = {
      name,
      followedAt,
      topPost: topSubRedditPost,
    };

    return dispatch(addSubreddit(subReddit));
  },
);

const feedSlice = createSlice({
  name: 'feed',
  initialState: INITIAL_STATE.feed,
  reducers: {

    addSubreddit(state: AppState['feed'], action: Action): any {

      const subReddit: SubReddit = action.payload;
      const exists = state.list.find((sub: SubReddit) => sub.name === subReddit.name);

      // do not overwrite state
      let list = [...state.list];

      // update current sub
      if (exists) {
        const nextList = sortByScore(list.map((sub: SubReddit) => {
          if (sub.name === subReddit.name) {
            // include fresh sub
            return subReddit;
          }
          return sub;
        }));
        persistFeed(nextList); // persist on change
        return {
          ...state,
          list: nextList,
        };
      }

      // remove oldest followed sub
      if (state.list.length === SUBREDDIT_FOLLOW_LIMIT) {
        // pop off oldest followed reddit
        const nextList = sortByFollowedAt(list.concat(subReddit));
        nextList.pop();
        persistFeed(sortByScore(nextList));
        return  {
          ...state,
          list: nextList,
        };
      }

      const nextList = sortByScore(state.list.concat(subReddit as any));
      persistFeed(nextList);
      return { status: state.status, list: nextList };
    },

    removeSubreddit(state: AppState['feed'], action: Action): any {
      const name = action.payload;
      const nextList = state.list.filter((sub: SubReddit) => sub.name !== name);
      persistFeed(nextList);
      return { status: state.status, list: nextList };
    },

  },

  // handle async request states
  extraReducers: (builder: ActionReducerMapBuilder<AppState['feed']>) => {

    builder.addCase(fetchSubreddit.pending, (state: AppState['feed'], action: any) => {
      state.status.subRedditName = action.meta.arg.name;
      state.status.state = 'pending';
      return state;
    });

    builder.addCase(fetchSubreddit.fulfilled, (state: AppState['feed'], action: any) => {
      state.status.subRedditName = action.meta.arg.name;
      state.status.state = action.meta.requestStatus; // can be error
      return state;
    });

    builder.addCase(fetchSubreddit.rejected, (state: AppState['feed'], action: any) => {
      state.status.subRedditName = action.meta.arg.name;
      state.status.state = 'error';
      return state;
    });

  },

});

export const { addSubreddit, removeSubreddit } = feedSlice.actions;
export { fetchSubreddit };

export const reducer = combineReducers({
  feed: feedSlice.reducer,
});

export const store = configureStore({ reducer, preloadedState: INITIAL_STATE });

export { INITIAL_STATE };
