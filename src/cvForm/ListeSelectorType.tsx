import React, { Component, useState } from 'react'

export default function  ListeSelectorType(props:{onChange:(id:any)  => void, delete:(id:any)  => void,key:number,type:string}) {
  const[id,setId] = useState(props.key)
  const [stateType, setStateType] = useState(props.type);

  let result
  switch(stateType) {
    case "title":
       result = <div>
                  <div onClick={()=>{
                    setStateType("");
                  }}>title</div>
                </div>   
    break;
    case "text":
       result = <div>
                  <div onClick={()=>{
                    setStateType("");
                  }}>text</div>
                </div>   
    break;
    case "section":
       result = <div>
                  <div onClick={()=>{
                    setStateType("");
                  }}>section</div>
                </div>   
    break;
    case "link":
      result = <div>
                 <div onClick={()=>{
                   setStateType("");
                 }}>link</div>
               </div>   
    break;
    case "list":
       result = <div>
                  <div onClick={()=>{
                    setStateType("");
                  }}>list</div>
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
