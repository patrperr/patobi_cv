import { Button, ButtonGroup, Switch } from '@mui/material';
import React from 'react';
import './App.css';
import CVDisplayer from './cvdisplayer/CVDisplayer';
import CreateItems from './cvForm/CreateItems';

type state = {
  isEdit: boolean;
}
type props = {
  isEdit: boolean;
}


class App extends React.Component<props>{
  state: state = { isEdit: this.props.isEdit }

  setEdit = () => {
    this.setState({ isEdit: true });
  }

  unsetEdit = () => {
    this.setState({ isEdit: false });
  }

  render() {
    if (this.state.isEdit) {
      return (
        <div className="App">
          <div className='menu'>
            <h1 className='main-title'>Patobi CV Creator</h1>
            <div className='menu-darkmode-switch'>
              <Switch color='primary'/><span>dark theme</span>
            </div>
            <div className='menu-buttons'>
              <ButtonGroup aria-label="large button group">
                <Button onClick={this.setEdit} variant="contained">Create CV</Button>
                <Button onClick={this.unsetEdit}>View CV</Button>
              </ButtonGroup>
            </div>
          </div>

          <div className='content'>
            <CreateItems />
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className='menu'>
            <h1 className='main-title'>Patobi CV Creator</h1>
            <div className='menu-darkmode-switch'>
              <Switch color='primary'  /><span>dark theme</span>
            </div>
            <div className='menu-buttons'>
              <ButtonGroup aria-label="large button group">
                <Button onClick={this.setEdit} >Create CV</Button>
                <Button onClick={this.unsetEdit} variant="contained">See test CV</Button>
              </ButtonGroup>
            </div>
          </div>
          <div className='content'>
            <CVDisplayer />
          </div>
        </div>
      );
    }


  }
}

export default App;

