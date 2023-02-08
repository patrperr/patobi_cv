import React from 'react'
import { Section, CVObject } from '../types'
import CV from '../cvRessources/cvs/sampleCVJSON.json'

export function jsonToObject(jsonUrl:string) {

    // let json = import(jsonUrl);
  
    let cvToDisplay = new CVObject();
    //cvToDisplay = JSON.parse(CV); 
    cvToDisplay = Object.assign(cvToDisplay, CV);
    


    return cvToDisplay
}
