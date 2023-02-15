import React, { Component, useState } from 'react'
import FieldLink from './cvFieldType/FieldLink';
import FieldList from './cvFieldType/FieldList';
import FieldSection from './cvFieldType/FieldSection';
import FieldText from './cvFieldType/FieldText';
import FieldTitle from './cvFieldType/FieldTitle';

export default function  ListeSelectorType(props:{onChange:(id:any)  => void, delete:(id:any)  => void,key:number,type:string}) {
  const[id,setId] = useState(props.key)
  const [stateType, setStateType] = useState(props.type);

  let result
  switch(stateType) {
    case "title":
       result = <div>
                  <FieldTitle/>
                </div>   
    break;
    case "text":
       result = <div>
                  <FieldText />
                </div>   
    break;
    case "section":
       result = <div>
                  <FieldSection/>
                </div>   
    break;
    case "link":
      result = <div>
                 <FieldLink/>
               </div>   
    break;
    case "list":
       result = <div>
                  <FieldList/>
                </div>   
    break;
    default:
      result= <div> 
      <select onChange={e=>setStateType(e.target.value)} name="pets" id="pet-select">
        <option value="">--Please choose an option--</option>
        <option value="title">Title</option>
        <option value="text">Textarea</option>
        <option value="list">Liste</option>
        <option value="section">Section</option>
        <option value="link">Link</option>
      </select>
      <button onClick={() => props.delete(props.key)}>X</button>
    </div>
    break;
  }
 
    return result      
    
  
  
}
