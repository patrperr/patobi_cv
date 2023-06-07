import { ChangeEvent, useState } from 'react'
import "./styles/createItems.css"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import './../cvRessources/cvs/sampleCVJSON.json';
import ListeSelectorType from './ListeSelectorType'
import { ButtonGroup, Divider, TextField } from '@mui/material';
import CPSection from '../cvdisplayer/CPSection';
import { FileUploadOutlined, FolderOpen } from '@mui/icons-material';
import { UploadNewCV } from '../toolbox/jsonManager';
import { CVObject } from '../types';



export default function CreateItems(props: { id: number, onFormChange: (id: number, content: any) => void }) {
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


  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
  };



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
            <Button variant='contained' style={{ marginLeft: "20px" }} onClick={handleUploadCV} startIcon={<FileUploadOutlined />} /*hidden={this.state.uploadIsActive}*/ >Upload CV</Button>

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
          <div className='all-sections'>
            <div className='cv-general-data'>
              <h1> {cvToDisplay?.firstName} {cvToDisplay?.name}</h1>
              <table className='cv-general-data-table'>

                <Divider className='divider' textAlign="left" sx={{
                  "&::before, &::after": {
                    borderColor: "#384561",
                  }
                }}>General information</Divider>

                <tr>
                  <td><p><strong>First name :</strong> {cvToDisplay?.firstName}</p></td>
                  <td><p><strong>Last name :</strong> {cvToDisplay?.name}</p></td>
                </tr>

                <tr>
                  <td><p><strong>Birthdate :</strong> {cvToDisplay?.birthDate}</p></td>
                </tr>

                <Divider className='divider' textAlign="left" sx={{
                  "&::before, &::after": {
                    borderColor: "#384561",
                  }
                }}>Contact information</Divider>

                <tr>
                  <td><p><strong>Adress :</strong> {cvToDisplay?.address} {cvToDisplay?.housenumber}</p></td>
                  <td><p><strong>Locality :</strong> {cvToDisplay?.npa}  {cvToDisplay?.city}</p></td>
                </tr>

                <tr>
                  <td><p><strong>Country :</strong> {cvToDisplay?.country}</p></td>
                  <td><p><strong>Region :</strong> {cvToDisplay?.state}</p></td>
                </tr>

                <tr>
                  <td><p><strong>E-Mail :</strong> {cvToDisplay?.email}</p></td>
                  <td><p><strong>Phone :</strong> {cvToDisplay?.phone}</p></td>
                </tr>

                <Divider className='divider' textAlign="left" sx={{
                  "&::before, &::after": {
                    borderColor: "#384561",
                  }
                }}>CV</Divider>
              </table>
              {cvToDisplay?.allSections && cvToDisplay?.allSections.map(section => {
                return (
                  <>
                    <div key={section.title} className="section-grand-parent-div">
                      <CPSection sectionToDiplay={section} level={1} isChild={false} />
                    </div>
                  </>)
              })}
            </div>
          </div>


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

            <div className="general-information-entry">
              <table className="general-information-table">
                <h3 className="general-information-title">General informations</h3>
                <tr>
                  <td>
                    <TextField
                    className='general-information-entry-form'
                      label="First Name"
                      name="firstName"
                      value="firstName"
                      onChange={handleChange}
                      required
                    />
                  </td>
                  <td>
                    <TextField
                    className='general-information-entry-form'
                      label="Last Name"
                      name="lastName"
                      value="lastName"
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextField
                    className='general-information-entry-form'
                      label="Birthdate"
                      name="birthdate"
                      value="birthdate"
                      onChange={handleChange}
                      style={{marginTop:'10px'}}
                      required
                    />
                  </td>
                  <td>
                    <TextField
                    className='general-information-entry-form'
                      label="Address"
                      name="address"
                      value="address"
                      onChange={handleChange}
                      style={{marginTop:'10px'}}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextField
                    className='general-information-entry-form'
                      label="Locality"
                      name="locality"
                      value="locality"
                      onChange={handleChange}
                      style={{marginTop:'10px'}}
                      required
                    />
                  </td>
                  <td>
                    <TextField
                    className='general-information-entry-form'
                      label="Country"
                      name="country"
                      value="country"
                      onChange={handleChange}
                      style={{marginTop:'10px'}}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextField
                    className='general-information-entry-form'
                      label="Region"
                      name="region"
                      value="region"
                      onChange={handleChange}
                      style={{marginTop:'10px'}}
                      required
                    />
                  </td>
                  <td>
                    <TextField
                    className='general-information-entry-form'
                      label="E-Mail"
                      name="email"
                      value="E-Mail"
                      onChange={handleChange}
                      style={{marginTop:'10px'}}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextField
                    className='general-information-entry-form'
                      label="Phone"
                      name="phone"
                      value="Phone"
                      onChange={handleChange}
                      style={{marginTop:'10px', marginBottom:'25px'}}
                      required
                    />
                  </td>
                </tr>
              </table>
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
