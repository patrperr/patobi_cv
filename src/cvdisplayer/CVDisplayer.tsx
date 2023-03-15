import { ChangeEvent, Component } from 'react'
import { CVObject } from '../types'
import CV from '../cvRessources/cvs/sampleCVJSON.json'
import CPSection from './CPSection';
import { Alert, Button, Snackbar } from '@mui/material';
import { FileUploadOutlined, FolderOpen } from '@mui/icons-material';
import '../App.css'


export class CVDisplayer extends Component<{}, {
  cvToDisplay: CVObject,
  fileReference?: File,
  showSuccessSnack?: boolean,
  showErrorSnack?: boolean,
  uploadIsActive: boolean

}>{

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      cvToDisplay: new CVObject(),
      showSuccessSnack: false,
      showErrorSnack: false,
      uploadIsActive:false
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
        this.setState({ cvToDisplay: newCV, showSuccessSnack: true, uploadIsActive:false });
      };

      // console.log(this.state.cvToDisplay);//!

    } else {
      this.setState({ showErrorSnack: true })
    }
  }

  ShowSuccessSnack() { this.setState({ showSuccessSnack: true }) }
  HideSuccessSnack() { this.setState({ showSuccessSnack: false }) }
  ShowErrorSnack() { this.setState({ showErrorSnack: true }) }
  HideErrorSnack() { this.setState({ showErrorSnack: false }) }



  SelectFileToUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      this.setState({ fileReference: e.target.files[0], uploadIsActive : true });
    }
  }

  render() {

    let baseKey: string = "CvMainSection";
    let keynumber: number = 0;

    return (
      <div className='CVDisplayer'>
        <div className='file-input'>
          <div className='file-input-buttons'>
            <Button variant="contained" startIcon={<FolderOpen />} component="label" color="primary">
              {" "}
              Select a CV
              <input type="file" hidden onChange={this.SelectFileToUpload} />
            </Button>
            <Button variant='contained' style={{marginLeft:"20px"}} startIcon={<FileUploadOutlined />} onClick={this.UploadNewCV.bind(this)} /*hidden={this.state.uploadIsActive}*/ disabled={!this.state.uploadIsActive}>Upload CV</Button>
          </div>
          <p className='file-input-span'>{this.state.fileReference?.name}</p>
          <br />

        </div>
        <div className='all-sections'>
          {
            this.state.cvToDisplay.allSections?.map(section => {
              keynumber++;
              let key = baseKey + keynumber;
              // console.log(this.state.cvToDisplay);//!
              return (<div key={key} className="section-grand-parent-div">
                <CPSection sectionToDiplay={section} level={1} isChild={false} />
              </div>)
            })
          }
        </div>
        <Snackbar open={this.state.showSuccessSnack} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} onClose={this.HideSuccessSnack.bind(this)}>
          <Alert severity="success" sx={{ width: '100%' }}>
            Cv Uploaded with sucess !
          </Alert>
        </Snackbar>
        <Snackbar open={this.state.showErrorSnack} autoHideDuration={3000} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} onClose={this.HideErrorSnack.bind(this)}>
          <Alert severity="error" sx={{ width: '100%' }}>
            Sorry, there was an error loading the CV...
          </Alert>
        </Snackbar>
      </div>
    )
  }
}

export default CVDisplayer

