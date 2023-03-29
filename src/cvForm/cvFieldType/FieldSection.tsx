import React from 'react'
import CreateItems from '../CreateItems'

export default function FieldSection(props:{onContentChange:(id:number,content:any)=>void, id:number}) {
  return (
    <div style={{paddingLeft: "10px",border:"solide 5px red"}}>
        <CreateItems id={props.id} onFormChange={props.onContentChange}/>
    </div>
  )
}
