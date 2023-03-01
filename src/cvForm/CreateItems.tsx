import { useState } from 'react'
import "./styles/createItems.css"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './../cvRessources/cvs/sampleCVJSON.json';
import ListeSelectorType from './ListeSelectorType'


export default function CreateItems() {
   const [items,setItems] = useState<any[]>([])
  
  function addComponent() { 
    let newItems : any[] = [...items];
    let obj = {id:newItems.length}
      newItems.push(obj);
      setItems(newItems)
  }

  function deleteComponent(id = 0) { 
    let newItems : any[] = [...items];
    let index = newItems.findIndex(o => o.id === id)

    if(index >= 0){
      newItems.splice(index,1);
      console.log(`deleted ${index}`)
      console.log(newItems)
      setItems(newItems)
    }
  }
  let onEachChange = (key:number = 0) =>{
    console.log(items.length)
   // console.log(items[items.length-1])
    // console.log(items[key]);
  }

   return (
    <div className='create-items'>
      <div>
        {
          items.length ? 
          items.map((data:any) => {
            return <ListeSelectorType key={data.id} id={data.id} onChanges={() => onEachChange(data.id)} delete={() => deleteComponent(data.id)} type=''/>
          })
          : null
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


