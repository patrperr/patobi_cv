import React from 'react';
import logo from './logo.svg';
import './App.css';
import CVmenu from './CVmenu';
import CVDisplayer from './cvdisplayer/CVDisplayer';

function App() {



  return (
    <div className="App">
      <CVmenu/>
      <CVDisplayer/>
    </div>
  ); 
}

export default App;
