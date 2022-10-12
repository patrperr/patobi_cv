import React, { Component } from 'react'
import "./styles/createItems.css"
import Button from '@mui/material/Button';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import './../cvRessources/cvs/sampleCVJSON.json';
import { nodeModuleNameResolver } from 'typescript';
import ListeSelectorType from './ListeSelectorType'

export class 
    CreateItems
 extends Component {
  render() {
    return (
      <div className='create-items'>
        <Button className='create-items-add-button' variant="outlined" onClick={() => {
          console.log('clicked')
          }} endIcon={<AddIcon />}>
          Create item
        </Button>
      </div>
    )
  }
}

export default 
    CreateItems
