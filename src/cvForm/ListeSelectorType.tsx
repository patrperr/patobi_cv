import { useState } from 'react'
import FieldLink from './cvFieldType/FieldLink';
import FieldList from './cvFieldType/FieldList';
import FieldSection from './cvFieldType/FieldSection';
import FieldText from './cvFieldType/FieldText';
import FieldTitle from './cvFieldType/FieldTitle';

export default function  ListeSelectorType(props:{onChanges:(id:number,type:string)  => void, onDelete:(id:any)  => void,onContentChange:(id:number,content:any)=>void,id:number,type:string}) {
  const[id] = useState(props.id)
  const [stateType,setStateType] = useState(props.type);

  let result
  switch(stateType) {
    case "title":
       result = <div>
                  <FieldTitle onContentChange={props.onContentChange} id={id}/>
                </div>   
    break;
    case "text":
       result = <div>
                  <FieldText onContentChange={props.onContentChange} id={id}/>
                </div>   
    break;
    case "section":
       result = <div>
                  <FieldSection onContentChange={props.onContentChange} id={id}/>
                </div>   
    break;
    case "link":
      result = <div>
                 <FieldLink onContentChange={props.onContentChange} id={id}/>
               </div>   
    break;
    case "list":
       result = <div>
                  <FieldList onContentChange={props.onContentChange} id={id} />
                </div>   
    break;
    default:
      result= <div> 
      <select onChange={e=>{
            props.onChanges(props.id,e.target.value);
            setStateType(e.target.value);
          }
        } name="" id="">
        <option value="default">--Please choose an option╰(*°▽°*)╯--</option>
        <option value="title">Title</option>
        <option value="text">Textarea</option>
        <option value="list">Liste</option>
        <option value="section">Section</option>
        <option value="link">Link</option>
      </select>
      <button onClick={() => props.onDelete(id)}>X</button>
    </div>
    break;
  }
 
    return result      
    
  
  
}
