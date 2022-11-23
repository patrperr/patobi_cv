import React, { useEffect } from 'react'
import { Section } from '../types'

export default function CPSection(props:{sectionToDiplay: Section}):JSX.Element  {

    switch (props.sectionToDiplay.fieldType) {
        case "section":
            return (
                <div>
                    <div className='section-title-div'>
                        <h3 className='section-title'>{props.sectionToDiplay.title}</h3>
                    </div>
                    <div className='section-content-container'>
                        <>
                        {
                            props.sectionToDiplay.fieldData.map(subsectiondata => {
                                let subsection:Section;
                                let temp = subsectiondata as unknown;
                                subsection = temp as Section;
                                
                                console.log(subsectiondata);
                                return  <CPSection sectionToDiplay={subsection} />
                            })
                            
                        }
                        </>
                    </div>
                </div>
            );


            break;
        case "title":
            props.sectionToDiplay.fieldData.forEach(fieldData => {
                console.log("sectionToDiplay.fieldData")
                return (
                    <div className='section-title-div'>
                        <h3 className='section-title'>{props.sectionToDiplay.fieldData}</h3>
                        <>{console.log("sectionToDiplay.fieldData"+props.sectionToDiplay.fieldData)}</>
                    </div>
                )
            });
            break;
        case "text":
            props.sectionToDiplay.fieldData.forEach(fieldData => {
                <div className='section-title-div'>
                        <p className='section-text'>{props.sectionToDiplay.fieldData[0]}</p>
                </div>
            });
            break;
        case "image":
            props.sectionToDiplay.fieldData.forEach(fieldData => {
                    <div>a</div>
            });
            break;
        case "list":
            props.sectionToDiplay.fieldData.forEach(fieldData => {
                <div>a</div>
            });
            break;
        case "link":
            props.sectionToDiplay.fieldData.forEach(fieldData => {
                <div className='section-title-div'>
                </div>
            });
            break;

        default:
            return <div>Cépété</div>
            break;
    }
    return <div>a</div>

}
