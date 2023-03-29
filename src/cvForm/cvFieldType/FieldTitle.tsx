import React, { useState } from 'react'

export default function FieldTitle(props:{onContentChange:(id:number,content:any)=>void, id:number}) {
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
        props.onContentChange(props.id, [stateText])
        result = <h1 style={{width: "fit-content",margin:"0px auto"}} onClick={()=>{setStatePrewiew(false)}}>
            {stateText}
        </h1>
    }
    return result
}
