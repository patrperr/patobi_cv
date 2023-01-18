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

  UploadNewCV() {
    // console.log("UploadNewCV"); //!
    if (this.state.fileReference !== undefined) {
      // console.log(this.state.fileReference); //!
      const fileReader = new FileReader();
      let newCV: CVObject;

      fileReader.readAsText(this.state.fileReference, "UTF-8");
      fileReader.onload = e => {
        const target = e.target;
        const result: string | undefined = target?.result?.toString();
        // console.log(result);//!
        if (result !== undefined) {
          newCV = JSON.parse(result);
        }
        this.setState({ cvToDisplay: newCV });
      };

      // console.log(this.state.cvToDisplay);//!

    } else {
      alert("Error while uploading CV (alfa alert)")
    }
  }


  SelectFileToUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      this.setState({ fileReference: e.target.files[0] });
    }
  }

  render() {

    let baseKey: string = "CvMainSection";
    let keynumber: number = 0;
    let uplaodisActive: boolean = false;

    if (this.state.fileReference !== undefined) {
      uplaodisActive = true;
    }

    return (
      <div>
        <div>
          <Input type="file" onChange={this.SelectFileToUpload} /> <br />
          <Button variant='contained' startIcon={<FileUploadOutlined />} onClick={this.UploadNewCV.bind(this)} disabled={!uplaodisActive}>Upload CV</Button>
        </div>
        {
          this.state.cvToDisplay.allSections?.map(section => {
            keynumber++;
            let key = baseKey + keynumber;
            // console.log(this.state.cvToDisplay);//!
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

