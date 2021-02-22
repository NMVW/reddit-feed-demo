import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import './Search.css';

import Autocomplete from './Autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { SubReddit, AppState } from '../../interfaces';
import { fetchSubreddit } from '../../services/redux';

const btnStyles = {
  color: 'white',
  background: '#48a4c1',
  fontFamily: 'system-ui',
  borderBottomLeftRadius: 0,
  borderTopLeftRadius: 0,
  padding: '.7rem',
};

export default function Search (props: { notify: (message: string) => void }) {

  const dispatch = useDispatch();
  const [ selectedOption, selectOption ] = useState('');
  const subredditsFollowed: string[] = useSelector((state: AppState) => state.feed.list.map((sub: SubReddit) => sub.name));
  
  const addSubreddit = (name: string) => dispatch(fetchSubreddit({ name }));

  const subscribe = () => {
    const alreadyFollowed = subredditsFollowed.includes(selectedOption);
    if (alreadyFollowed) {
      props.notify(`Already following r/${selectedOption}`);
    } else {
      // will dispatch async call and add to feed
      props.notify(`Subscribed to r/${selectedOption}.`);
      addSubreddit(selectedOption);
    }
    selectOption('');
  };

  return (
    <div className="SearchBar">
      <div className="SubRedditSearchIcon">r/</div>
      <Autocomplete
        selectedOption={selectedOption}
        selectOption={(option: string) => selectOption(option)}
      />
      <Button className={!selectedOption ? 'Disabled': ''} disabled={!selectedOption} variant="contained" onClick={subscribe} style={btnStyles}>Subscribe</Button>
    </div>
  );
}