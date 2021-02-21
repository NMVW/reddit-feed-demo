import React, { Suspense } from 'react';
import { SubCard } from './SubCard';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const subs = ['AskReddit', 'football'];

export default function Feed () {
  // fetch all subreddit cards on load
  return (
    <Grid
      container
      spacing={3}
      direction="column"
      justify="space-evenly"
      alignItems="center"
    >
      <Grid item>
        <Typography>2/5 Channels</Typography>
        <Divider />
      </Grid>
      {
        subs.map((name: string) => (
          <Grid item key={name}>
            <SubCard name={name} />
          </Grid>
        ))
      }
    </Grid>
  );
}
