import { ChangeEvent, Component } from 'react'
import { CVObject } from '../types'
import CV from '../cvRessources/cvs/sampleCVJSON.json'
import CPSection from './CPSection';
import { Alert, Button, Divider, Snackbar } from '@mui/material';
import { FileUploadOutlined, FolderOpen } from '@mui/icons-material';
import '../App.css'
import { UploadNewCV } from '../toolbox/jsonManager';


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
      uploadIsActive: false
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

  ShowSuccessSnack() { this.setState({ showSuccessSnack: true }) }
  HideSuccessSnack() { this.setState({ showSuccessSnack: false }) }
  ShowErrorSnack() { this.setState({ showErrorSnack: true }) }
  HideErrorSnack() { this.setState({ showErrorSnack: false }) }

  handleUploadCV = () => {
    const fileReference: File | undefined = this.state.fileReference;
    
    UploadNewCV(fileReference)
      .then(({ newCV, showSuccessSnack, uploadIsActive, showErrorSnack }) => {
        // Handle the updated values here
        if (newCV) {
          this.setState({ cvToDisplay: newCV});
        }
        this.setState({ showSuccessSnack: showSuccessSnack });
        this.setState({ uploadIsActive: uploadIsActive });
        this.setState({ showErrorSnack: showErrorSnack });
      })
      .catch((error) => {
        // Handle any errors that occurred during the process
        console.error(error);
      });
  };

  SelectFileToUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      this.setState({ fileReference: e.target.files[0], uploadIsActive: true });
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
            <Button variant='contained' style={{ marginLeft: "20px" }} startIcon={<FileUploadOutlined />} onClick={ this.handleUploadCV } /*hidden={this.state.uploadIsActive}*/ disabled={!this.state.uploadIsActive}>Upload CV</Button>
          </div>
          <p className='file-input-span'>{this.state.fileReference?.name}</p>
          <br />

        </div>

        <div className='all-sections'>
          <div className='cv-general-data'>
            <h1> {this.state.cvToDisplay.firstName} {this.state.cvToDisplay.name}</h1>
            <table className='cv-general-data-table'>

              <Divider className='divider' textAlign="left" sx={{
                "&::before, &::after": {
                  borderColor: "#384561",
                }
              }}>General information</Divider>

              <tr>
                <td><p><strong>First name :</strong> {this.state.cvToDisplay.firstName}</p></td>
                <td><p><strong>Last name :</strong> {this.state.cvToDisplay.name}</p></td>
              </tr>

              <tr>
                <td><p><strong>Birthdate :</strong> {this.state.cvToDisplay.birthDate}</p></td>
              </tr>

              <Divider className='divider' textAlign="left" sx={{
                "&::before, &::after": {
                  borderColor: "#384561",
                }
              }}>Contact information</Divider>

              <tr>
                <td><p><strong>Adress :</strong> {this.state.cvToDisplay.address} {this.state.cvToDisplay.housenumber}</p></td>
                <td><p><strong>Locality :</strong> {this.state.cvToDisplay.npa}  {this.state.cvToDisplay.city}</p></td>
              </tr>

              <tr>
                <td><p><strong>Country :</strong> {this.state.cvToDisplay.country}</p></td>
                <td><p><strong>Region :</strong> {this.state.cvToDisplay.state}</p></td>
              </tr>

              <tr>
                <td><p><strong>E-Mail :</strong> {this.state.cvToDisplay.email}</p></td>
                <td><p><strong>Phone :</strong> {this.state.cvToDisplay.phone}</p></td>
              </tr>
              
              <Divider className='divider' textAlign="left" sx={{
                "&::before, &::after": {
                  borderColor: "#384561",
                }
              }}>CV</Divider>
            </table>



          </div>
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

