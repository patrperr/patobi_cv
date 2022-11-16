import React from 'react';
import logo from './logo.svg';
import './App.css';
import CVmenu from './CVmenu';
import CVDisplayer from './cvdisplayer/CVDisplayer';
import CreateItems from './cvForm/CreateItems';

function App() {

  return (
    <div className="App">
      <CVmenu/>
      <CVDisplayer/>
      <CreateItems/>
      
    </div>
  ); 
}

export default App;
