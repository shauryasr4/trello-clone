import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/header.component.js'
import ListsContainer from './components/list-container/list-container.component.js';
import ListContext from './util/storage/context.js'

import StorageManager from './util/storage/storage-manager.js'

function App() {
  const [contextState, setcontextState] = useState()

  useEffect(() => {
    if (!StorageManager.getItem('listsData'))
      StorageManager.setItem('listsData', []);
    setcontextState(StorageManager.getItem('listsData'))
  }, [])

  function contextSync() {
    setcontextState(StorageManager.getItem('listsData'))
  }
  
  return (
    <div className="App">
      <ListContext.Provider value={{ contextState, contextSync }}>
        <Header />
        <ListsContainer />
      </ListContext.Provider>
    </div>
  );
}

export default App;
