import React from 'react';

import './Feed.css';
import { SubCard } from './SubCard';
import { SUBREDDIT_FOLLOW_LIMIT } from '../../constants';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import { SubReddit, AppState } from '../../interfaces';
import { fetchSubreddit, removeSubreddit } from '../../services/redux';

import { useDispatch, useSelector } from 'react-redux';

export default function Feed (props: { notify: (message: string) => void }) {

  const dispatch = useDispatch();
  const feed = useSelector((state: AppState) => state.feed.list);

  // refresh subs
  const refresh = (name: string) => () => dispatch(fetchSubreddit({ name }));
  const remove = (name: string) => () => dispatch(removeSubreddit(name));

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justify="space-evenly"
      alignItems="center"
      style={{ display: 'flex', marginTop: '1rem' }}
    >
      <Grid item style={{ alignSelf: 'flex-start' }}>
        <Typography variant="caption">{feed.length}/{SUBREDDIT_FOLLOW_LIMIT} Channels</Typography>
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Divider />
      </Grid>
      {
        (feed as SubReddit[]).map((subreddit: SubReddit) => (
          <Grid item key={subreddit.name}>
            <SubCard subreddit={subreddit} remove={remove(subreddit.name)} refresh={refresh(subreddit.name)} />
          </Grid>
        ))
      }
    </Grid>
  );
}
