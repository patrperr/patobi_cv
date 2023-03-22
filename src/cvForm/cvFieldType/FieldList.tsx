import React, { useState } from 'react'

export default function FieldList(props:{onContentChange:(key:number,content:any)=>void, id:number}) {
    const [statePrewiew, setStatePrewiew] = useState(false);
    const [stateText, setStateText] = useState('');
    let result
    if(!statePrewiew){
        result = <div>
            <input type="textarea" value={stateText} onChange={e=>{setStateText(e.target.value)}} onBlur={e=>{setStateText(e.target.value);setStatePrewiew(true)}} />
        </div>
    }
    else{
        if(stateText === '')
        {
            return null
        }
        props.onContentChange(props.id, stateText)
        result = <div style={{width: "auto",margin:"0px auto"}} onClick={()=>{setStatePrewiew(false)}}>
            {stateText}
        </div>
    }
    return result
}
