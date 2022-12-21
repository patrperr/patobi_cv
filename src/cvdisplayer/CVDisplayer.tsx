import  { Component } from 'react'
import { CVObject } from '../types'
import CV from '../cvRessources/cvs/sampleCVJSON.json'
import CPSection from './CPSection';


export class CVDisplayer extends Component {
  
  render() {

    let baseKey:string = "CvMainSection";
    let keynumber:number = 0;

    let cvToDisplay = new CVObject();
    cvToDisplay = Object.assign(cvToDisplay, CV);

    // console.log(cvToDisplay);//!





  // this.render() {
  //   let test = jsonToObject("");
  //   console.log(test);
    
    return (
      <div>

        <p>CVDisplayer</p>

        <div>
          {
            cvToDisplay.allSections?.map(section => {
              keynumber++;
              let key = baseKey+keynumber;
              return(<div key={key}> <CPSection sectionToDiplay={section} isChild={false}/></div>)
            })
          }
        </div>

      </div>
    )
  }
}

export default CVDisplayer