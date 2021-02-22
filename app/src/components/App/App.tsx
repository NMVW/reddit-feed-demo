import React, { useState } from 'react';
import './App.css';
import logo from './logo.png';

import Search from '../Search/Search';
import Feed from '../Feed/Feed';
import Notice from '../Notice';
import AppMenu from '../Menu';
import Avatar from '@material-ui/core/Avatar';

function App() {
  const [ notice, notify ] = useState('');
  const [ menuAnchor, setMenuAnchor ] = useState(null);
  return (
    <div className="App">
      <Avatar
        src={logo}
        onMouseOver={(ev: any) => setMenuAnchor(ev.currentTarget as any)}
      />
      { menuAnchor && <AppMenu anchor={menuAnchor} close={() => setMenuAnchor(null)} /> }
      <h2 className="Header">Add to my feed:</h2>
      <Search notify={notify} />
      <Feed notify={notify} />
      { notice && <Notice message={notice} stickMs={1000} reset={() => notify('')} /> }
    </div>
  );
}

export default App;
