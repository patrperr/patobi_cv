import { ChangeEvent, useState } from 'react'
import "./styles/createItems.css"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './../cvRessources/cvs/sampleCVJSON.json';
import ListeSelectorType from './ListeSelectorType'
import { ButtonGroup } from '@mui/material';
import CPSection from '../cvdisplayer/CPSection';
import { FileUploadOutlined, FolderOpen } from '@mui/icons-material';
import { UploadNewCV } from '../toolbox/jsonManager';
import { CVObject } from '../types';



export default function CreateItems(this: any, props: { id: number, onFormChange: (id: number, content: any) => void }) {
  const [items, setItems] = useState<any[]>([])
  const [isPreview, setIsPrewiew] = useState(Boolean)
  const [fileReference, setFileReference] = useState<File | undefined>(undefined);
  const [showSuccessSnack, setShowSuccessSnack] = useState<boolean | undefined>(undefined);
  const [uploadIsActive, setUploadIsActive] = useState<boolean | undefined>(undefined);
  const [showErrorSnack, setShowErrorSnack] = useState<boolean | undefined>(undefined);
  const [cvToDisplay, setcvToDisplay] = useState<CVObject | undefined>(undefined);


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

  const handleUploadCV = () => {
    UploadNewCV(fileReference)
      .then(({ newCV, showSuccessSnack, uploadIsActive, showErrorSnack }) => {
        // Handle the updated values here
        if (newCV) {
          setcvToDisplay(newCV);
        }
        setShowSuccessSnack(showSuccessSnack);
        setUploadIsActive(uploadIsActive);
        setShowErrorSnack(showErrorSnack);
      })
      .catch((error) => {
        // Handle any errors that occurred during the process
        console.error(error);
      });
  };
  
  const onContentChange = (id: number, content: any) => {
    items[id].fieldData = content;
  }

  const onTypeChange = (id: number, type: string = '') => {
    console.log("type changed: ", items);
    items[id].fieldType = type;
  }


  const SelectFileToUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileReference(e.target.files[0]); 
      setUploadIsActive(true);
    }
  }

  return (
    <div>
      <div className='sub-menu-buttons'>
        <div className='file-input'>
          <div className='file-input-buttons'>
            <Button variant="contained" startIcon={<FolderOpen />} component="label" color="primary">
              {" "}
              Select a CV
              <input type="file" hidden onChange={SelectFileToUpload} />
            </Button>
            <Button variant='contained' style={{ marginLeft: "20px" }} onClick={ handleUploadCV } startIcon={<FileUploadOutlined />} /*hidden={this.state.uploadIsActive}*/ >Upload CV</Button>
          
            <span className='file-input-span'>{fileReference?.name}</span>
            </div>
          
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
        cvToDisplay?.allSections && cvToDisplay?.allSections.map(section => {
            return (<div key={section.title} className="section-grand-parent-div">
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


