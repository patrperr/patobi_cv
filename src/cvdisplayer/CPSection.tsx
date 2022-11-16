import React from 'react'
import { Section } from '../types'

function CPSection(sectionToDiplay: Section) {


    switch (sectionToDiplay.fieldType) {
        case "section":
            return (
                <div>
                    <div className='section-title-div'>
                        <h3 className='section-title'>{sectionToDiplay.title}</h3>
                    </div>
                    <div className='section-content-container'>
                        <>
                        {
                            sectionToDiplay.fieldData.forEach(subsectiondata => {
                                let subsection:Section;
                                let temp = subsectiondata as unknown;
                                subsection = temp as Section;
                                
                                //console.log(subsectiondata);
                                CPSection(subsection);
                            })
                            


                        }
                        </>
                    </div>
                </div>
            );


            break;
        case "title":
            sectionToDiplay.fieldData.forEach(fieldData => {
                console.log("sectionToDiplay.fieldData")
                return (
                    <div className='section-title-div'>
                        <h3 className='section-title'>{sectionToDiplay.fieldData}</h3>
                        <>{console.log("sectionToDiplay.fieldData"+sectionToDiplay.fieldData)}</>
                    </div>
                )
            });
            break;
        case "text":
            sectionToDiplay.fieldData.forEach(fieldData => {
                <div className='section-title-div'>
                        <p className='section-text'>{sectionToDiplay.fieldData[0]}</p>
                </div>
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
                <div className='section-title-div'>
                </div>
            });
            break;

        default:
            break;
    }

}

export default CPSection