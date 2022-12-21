import React from 'react';
import logo from './logo.svg';
import './App.css';
import CVDisplayer from './cvdisplayer/CVDisplayer';
import CreateItems from './cvForm/CreateItems';
import { PropaneSharp, SettingsInputAntennaTwoTone } from '@mui/icons-material';

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
          <div>
            <p>Menu</p>
            <button onClick={this.setEdit}>Create CV</button>
            <button onClick={this.unsetEdit}>See test CV</button>
          </div>
          <CreateItems />
        </div>
      );
    }else{
      return (
        <div className="App">
          <div>
            <p>Menu</p>
            <button onClick={this.setEdit}>Create CV</button>
            <button onClick={this.unsetEdit}>See test CV</button>
          </div>
          <CVDisplayer />
        </div>
      );
    }

    
  }
}

export default App;

