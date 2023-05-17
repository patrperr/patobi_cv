import React from 'react'
import { Section, CVObject } from '../types'
import CV from '../cvRessources/cvs/sampleCVJSON.json'

export function jsonToObject(jsonUrl:string) {

    let cvToDisplay = new CVObject();
    cvToDisplay = Object.assign(cvToDisplay, CV);
    

    return cvToDisplay
}


export function UploadNewCV(fileReference: File | undefined): Promise<{
    newCV: CVObject | undefined;
    showSuccessSnack: boolean;
    uploadIsActive: boolean;
    showErrorSnack: boolean;
  }> {
    return new Promise((resolve) => {
      if (fileReference !== undefined) {
        const fileReader = new FileReader();
        let newCV: CVObject | undefined;
        let showSuccessSnack = false;
        let uploadIsActive = true;
        let showErrorSnack = false;
  
        fileReader.readAsText(fileReference, "UTF-8");
        fileReader.onload = (e) => {
          const target = e.target;
          const result: string | undefined = target?.result?.toString();
          if (result !== undefined) {
            newCV = JSON.parse(result);
          }
          resolve({
            newCV,
            showSuccessSnack: true,
            uploadIsActive: false,
            showErrorSnack,
          });
        };
      } else {
        resolve({
          newCV: undefined,
          showSuccessSnack: false,
          uploadIsActive: false,
          showErrorSnack: true,
        });
      }
    });
  }
