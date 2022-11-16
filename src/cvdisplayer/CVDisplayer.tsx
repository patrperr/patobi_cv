import React, { Component } from 'react'
import { Section, CVObject } from '../types'
import CV from '../cvRessources/cvs/sampleCVJSON.json'
import CPSection from './CPSection';
import { type } from 'os';


export class CVDisplayer extends Component {

  render() {
    let cvToDisplay = new CVObject();
    cvToDisplay = Object.assign(cvToDisplay, CV);

    // console.log(cvToDisplay);//!





    return (
      <div>
        {
          //! remove me!
        }<hr />



        <p>CVDisplayer</p>

        <>
          {
            cvToDisplay.allSections?.forEach(section => {
              CPSection(section);
            })
          }
        </>
        <hr />

      </div>
    )
  }
}

export default CVDisplayer