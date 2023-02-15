import React, { Component, useEffect, useState } from 'react'
import "./styles/createItems.css"
import Button from '@mui/material/Button';
import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import './../cvRessources/cvs/sampleCVJSON.json';
import { nodeModuleNameResolver } from 'typescript';
import ListeSelectorType from './ListeSelectorType'


export default function CreateItems() {
   const [items,setItems] = useState<JSX.Element[]>([])
  
  function addComponent() { 
    let newItems = [...items];
    newItems.push(<ListeSelectorType onChange={onEachClick} delete={deleteComponent} key={newItems.length} type={'test'} />);
    setItems(newItems)
    
  }
  function deleteComponent(id = 0) { 
    let newItems = [...items];
    console.log(id)
    setItems(current => current.filter(items => {
      
      return items.key !== id;
    }))
    
  }
  let onEachClick = (id:any) =>{
    console.log(id)
  }

   return (
    <div className='create-items'>
      <div>
        {
          items.map((data:JSX.Element) => {
            return <div>{data}</div>
          })
        }
      </div>
      <Button  className='create-items-add-button' variant="outlined" onClick={
        addComponent
      } endIcon={<AddIcon />}>
        Create item
      </Button>
    </div>
  )

}


