import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import './Search.css';

import { useNode } from '../../services/domNode';
import { SUBREDDIT_SEARCH_TEXT_PLACEHOLDER } from '../../constants';
import Autocomplete from './Autocomplete';

const btnStyles = {
  color: 'white',
  background: '#48a4c1',
  fontFamily: 'system-ui',
  borderBottomLeftRadius: 0,
  borderTopLeftRadius: 0,
  padding: '.7rem',
};

export default function Search () {

  const [ selectedOption, selectOption ] = useState('');

  const subscribe = () => {
    alert(selectedOption); // make async call to get full subreddit and add it to list in redux
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