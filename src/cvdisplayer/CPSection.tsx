import React from 'react'
import { Section } from '../types'

function CPSection(sectionToDiplay: Section) {


    switch (sectionToDiplay.fieldType) {
        case "section":

            // return (
            //     <div>
            //         <div className='section-title-div'>
            //             <h3 className='section-title'>{sectionToDiplay.title}</h3>
            //         </div>
            //         <div className='section-content-container'>
                       
            //         </div>
            //     </div>
            // );


            break;
        case "title":
            sectionToDiplay.fieldData.forEach(fieldData => {

            });
            break;
        case "text":
            sectionToDiplay.fieldData.forEach(fieldData => {

            });
            break;
        case "image":
            sectionToDiplay.fieldData.forEach(fieldData => {

            });
            break;
        case "list":
            sectionToDiplay.fieldData.forEach(fieldData => {

            });
            break;
        case "link":
            sectionToDiplay.fieldData.forEach(fieldData => {

            });
            break;

        default:
            break;
    }

}

export default CPSection