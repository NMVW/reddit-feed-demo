import React, { useState } from 'react';
import './App.css';

import Search from '../Search/Search';
import Feed from '../Feed/Feed';
import Notice from '../Notice';

function App() {
  const [ notice, notify ] = useState('');
  return (
    <div className="App">
      <h2 className="Header">Add to my feed:</h2>
      <Search notify={notify} />
      <Feed notify={notify} />
      { notice && <Notice message={notice} stickMs={1000} reset={() => notify('')} /> }
    </div>
  );
}

export default App;
