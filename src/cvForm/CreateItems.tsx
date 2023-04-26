import { useState } from 'react'
import "./styles/createItems.css"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './../cvRessources/cvs/sampleCVJSON.json';
import ListeSelectorType from './ListeSelectorType'
import { ButtonGroup } from '@mui/material';
import CPSection from '../cvdisplayer/CPSection';
import { FileUploadOutlined, FolderOpen } from '@mui/icons-material';



export default function CreateItems(this: any, props: { id: number, onFormChange: (id: number, content: any) => void }) {
  const [items, setItems] = useState<any[]>([])
  const [isPreview, setIsPrewiew] = useState(Boolean)

  function addComponent() {
    let newItems: any[] = [...items];
    let obj = { id: newItems.length, fieldType: '' }
    newItems.push(obj);

    setItems(newItems);
    setIsPrewiew(false);
    props.onFormChange(props.id, newItems);

  }

  function deleteComponent(id = 0) {

    let newItems: any[] = [...items];
    let index = newItems.findIndex(o => o.id === id)
    console.log('del')
    if (index >= 0) {
      newItems.splice(index, 1);
      setItems(newItems)
    }
  }

  const onContentChange = (id: number, content: any) => {
    items[id].fieldData = content;
  }

  const onTypeChange = (id: number, type: string = '') => {
    console.log("type changed: ", items);
    items[id].fieldType = type;
  }


  return (
    <div>
      <div className='sub-menu-buttons'>
        <div className='file-input'>
          <div className='file-input-buttons'>
            <Button variant="contained" startIcon={<FolderOpen />} component="label" color="primary">
              {" "}
              Select a CV
              <input type="file" hidden  />
            </Button>
            <Button variant='contained' style={{ marginLeft: "20px" }} startIcon={<FileUploadOutlined />} /*hidden={this.state.uploadIsActive}*/ >Upload CV</Button>
          </div>
          <p className='file-input-span'></p>
          <br />

        </div>
        {
          isPreview ?
            <ButtonGroup aria-label="large button group">
              <Button onClick={() => { setIsPrewiew(false) }}>Edit CV</Button>
              <Button onClick={() => { setIsPrewiew(true) }} variant="contained">Preview CV</Button>
            </ButtonGroup>
            :
            <ButtonGroup aria-label="large button group">
              <Button onClick={() => { setIsPrewiew(false) }} variant="contained">Edit CV</Button>
              <Button onClick={() => { setIsPrewiew(true) }}>Preview CV</Button>
            </ButtonGroup>

        }

      </div>
      {
        isPreview ?
          items.map(section => {
            return (<div key={section.id} className="section-grand-parent-div">
              <CPSection sectionToDiplay={section} level={1} isChild={false} />
            </div>)
          })
          :
          <div className='create-items'>
            <div>
              {
                items.length ?
                  items.map((data: any) => {
                    return <ListeSelectorType onChanges={onTypeChange} onDelete={deleteComponent} onContentChange={onContentChange} id={data.id} type={data.fieldType} />
                  })
                  : null
              }
            </div>
            <Button className='create-items-add-button' variant="outlined" onClick={
              addComponent
            } endIcon={<AddIcon />}>
              Create item
            </Button>
          </div>

      }

    </div>
  )
}