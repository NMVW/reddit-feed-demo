import React from 'react';
import './App.css';

import Search from '../Search/Search';
import Feed from '../Feed/Feed';

function App() {
  return (
    <div className="App">
      <h2 className="Header">Add to my feed:</h2>
      <Search />
      <Feed />
    </div>
  );
}

export default App;
