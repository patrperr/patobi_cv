import React, { Component, useState } from 'react'

export default function  ListeSelectorType(props:{onChange:(id:any)  => void, delete:(id:any)  => void,id:any}) {
  const[id,setId] = useState(props.id)
  
  return (
    <div>  
      <select onChange={()=>props.onChange(props.id)} name="pets" id="pet-select">
        <option value="">--Please choose an option--</option>
        <option value="Title">Title</option>
        <option value="Textarea">Textarea</option>
      </select>
      <button onClick={() => props.delete(props.id)}>X</button>
    </div>
  )
}
