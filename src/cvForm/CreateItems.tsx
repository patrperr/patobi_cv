import { useState } from 'react'
import "./styles/createItems.css"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './../cvRessources/cvs/sampleCVJSON.json';
import ListeSelectorType from './ListeSelectorType'


export default function CreateItems(props:{id:number,onFormChange : (id:number, content:any) => void}) {
   const [items,setItems] = useState<any[]>([])
  
  function addComponent() { 
    let newItems : any[] = [...items];
    let obj = {id:newItems.length,type:'',content:''}
    newItems.push(obj);
    setItems(newItems);
    props.onFormChange(props.id,newItems);
  }

  function deleteComponent(id = 0) { 
    let newItems : any[] = [...items];
    let index = newItems.findIndex(o => o.id === id)

    if(index >= 0){
      newItems.splice(index,1);
      setItems(newItems)
    }
  }

  let onContentChange = (id:number, content:any) =>{ 
    items[id].fieldData = content;
  }

  let onTypeChange = (id:number, type:string = '') =>{
    items[id].fieldType = type;
  }

   return (
    <div className='create-items'>
      <div>
        {
          items.length ?       
          items.map((data:any) => {
            return <ListeSelectorType onChanges={onTypeChange} onDelete={deleteComponent} onContentChange={onContentChange} id={data.id} type=''/>
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


