import { AppState, SubReddit } from '../interfaces';

import { SUBREDDIT_FOLLOW_LIMIT } from '../constants';
import { combineReducers } from 'redux';
import { configureStore, createSlice, createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { fetchSubredditTopPost } from './api';

const INITIAL_STATE: AppState = {
  feed: {
    status: {
      subRedditName: '',
      state: '',
    },
    list: [],
  },
};

interface Action {
  payload: any
  type: string
}

// creates sub action types /<fulfilled|pending|rejected>
const fetchSubreddit = createAsyncThunk(
  'feed/fetch',
  async ({ name }: { name: string }) => {
    const response = await fetchSubredditTopPost(name);
    return response;
  },
);

const feedSlice = createSlice({
  name: 'feed',
  initialState: INITIAL_STATE.feed,
  reducers: {

    addSubreddit(state: AppState['feed'], action: Action): any {
      const subReddit: SubReddit = action.payload;
      return { status: state.status, list: state.list.concat(subReddit as any) };
    },

    removeSubreddit(state: AppState['feed'], action: Action): any {
      const name = action.payload;
      return { status: state.status, list: state.list.filter(subReddit => subReddit.name !== name) };
    },

  },

  // handle async request states
  extraReducers: (builder: ActionReducerMapBuilder<AppState['feed']>) => {

    builder.addCase(fetchSubreddit.pending, (state: AppState['feed'], action: any) => {
      state.status.subRedditName = action.payload.name;
      state.status.state = 'pending';
      return state;
    });

    builder.addCase(fetchSubreddit.fulfilled, (state: AppState['feed'], action: any) => {
      state.status.subRedditName = action.payload.name;
      state.status.state = action.payload.status; // can be error
      return state;
    });

    builder.addCase(fetchSubreddit.rejected, (state: AppState['feed'], action: any) => {
      state.status.subRedditName = action.payload.name;
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

export const store = configureStore({ reducer })

export { INITIAL_STATE };
