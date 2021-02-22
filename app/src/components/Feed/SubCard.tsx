import React, { useState } from 'react';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Clear';
import RefreshIcon from '@material-ui/icons/Refresh';
import ScoreIcon from '@material-ui/icons/ThumbUp';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { SubReddit, EmptyPost } from '../../interfaces';
import Typography from '@material-ui/core/Typography';

const dateFormatOptions = {
  month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric',
};

export function SubCard (props: { subreddit: SubReddit, remove: () => void, refresh: () => void }) {
  const topPost = props.subreddit.topPost || EmptyPost;
  const [ isHovered, setHover ] = useState(false);
  const localDate = (new Intl.DateTimeFormat('en-US', dateFormatOptions)).format(new Date(props.subreddit.followedAt));
  return (
    <Card className="SubCard" raised={isHovered} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
      <CardContent style={{ display: 'flex', width: '40rem', justifyContent: 'space-between' }}>
        <Avatar src={topPost.thumbnail_url} style={{ width: '5rem', height: '5rem' }}>No Image</Avatar>
        <section style={{ display: 'flex', flexDirection: 'column', width: '22rem' }}>
          <Typography variant="body1" style={{ alignSelf: 'start' }}>r/{props.subreddit.name}</Typography>
          <br />
          <Typography variant="h6" style={{ alignSelf: 'start' }}><a className="RedditPostTitle" href={topPost.link_url}>{topPost.title}</a></Typography>
          <br />
          <Typography variant="caption" style={{ alignSelf: 'start' }}>{topPost.score}&nbsp;<ScoreIcon style={{ color: 'grey' }} />&nbsp;&nbsp;|&nbsp;&nbsp;{localDate}</Typography>
        </section>
        <CardActions>
          <IconButton onClick={props.remove}><CloseIcon /></IconButton>
          <IconButton onClick={props.refresh}><RefreshIcon style={{ color: '#48a4c1' }} /></IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
}