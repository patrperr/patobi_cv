import { ChangeEvent, Component } from 'react'
import { CVObject } from '../types'
import CV from '../cvRessources/cvs/sampleCVJSON.json'
import CPSection from './CPSection';
import { Button, Input } from '@mui/material';
import { FileUploadOutlined } from '@mui/icons-material';


export class CVDisplayer extends Component<{}, { 
  cvToDisplay: CVObject,
  fileReference?: File 

}> {

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      cvToDisplay: new CVObject()
    };
  }

  componentDidMount(): void {
    this.ChangeBaseCv();
  }

  ChangeBaseCv() {
    let cvToDisplayNoState = new CVObject();
    cvToDisplayNoState = Object.assign(cvToDisplayNoState, CV);
    this.setState({ cvToDisplay: cvToDisplayNoState });
  }

  UploadNewCV(){
    console.log(this.state.fileReference)
  }


  SelectFileToUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      this.setState({fileReference: e.target.files[0]});
      console.log("e.target.files[0]");
      console.log(e.target.files[0]);
      console.log("this.state.fileReference");
      console.log(this.state.fileReference);
    }
  }

  render() {

    let baseKey: string = "CvMainSection";
    let keynumber: number = 0;
    let uplaodisActive : boolean = false;

    if (this.state.fileReference !== undefined) {
      uplaodisActive = true;
    }

    return (
      <div>
        <div>
        <Input type="file" onChange={this.SelectFileToUpload} /> <br/>
        <Button variant='contained' startIcon={<FileUploadOutlined />} onClick={this.UploadNewCV} disabled={!uplaodisActive}>Upload CV</Button>
        </div>
        {
          this.state.cvToDisplay.allSections?.map(section => {
            keynumber++;
            let key = baseKey + keynumber;

            return (<div key={key}>
              <CPSection sectionToDiplay={section} isChild={false} />
            </div>)
          })
        }
      </div>
    )
  }
}

export default CVDisplayer

