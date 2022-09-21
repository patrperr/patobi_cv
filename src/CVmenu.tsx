import React, { Component } from 'react'

export class CVmenu extends Component {


    menuButtonHandler(){
        
    }
    
  render() {
    return (
      <div>
        <p>Menu</p>
        <button onClick={this.menuButtonHandler}>Create CV</button>
        <button onClick={this.menuButtonHandler}>See test CV</button> 
      </div>
    )
  }
}

export default CVmenu;