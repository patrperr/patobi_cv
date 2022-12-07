import React, { useEffect } from 'react'
import { Section } from '../types'

export default function CPSection(props: { sectionToDiplay: Section, isChild: boolean, key?: string, similarElements?: number, position?: number }): JSX.Element {
    console.log("FieldType : " + props.sectionToDiplay.fieldType);

    let key: string;
    let ChildPosition: number = -1;

    if (props.isChild) {
        if (props.position && props.position && props.key && props.key) {
            key = props.key + "-" + props.sectionToDiplay.fieldType + props.position;
        }
    } else {
        key = "CV-" + props.sectionToDiplay.fieldType;
    }


    switch (props.sectionToDiplay.fieldType) {
        case 'section':
            ChildPosition = -1;
            return (
                <div>
                    <div className='section-title-div'>
                        <h3 className='section-title'>{props.sectionToDiplay.title}</h3>
                    </div>
                    <div className='section-content-container'>
                        <>
                            {
                                props.sectionToDiplay.fieldData.map(subsectiondata => {
                                    ChildPosition++;
                                    let subsection: Section;
                                    let temp = subsectiondata as unknown;
                                    subsection = temp as Section;

                                    // console.log(subsectiondata);
                                    return <div key={key}>
                                        <CPSection sectionToDiplay={subsection} isChild={true} similarElements={props.sectionToDiplay.fieldData.length} position={ChildPosition} />
                                    </div>
                                })

                            }
                        </>
                    </div>
                </div>
            );


            break;
        case 'title':
            return (
                <>
                    {
                        props.sectionToDiplay.fieldData.map(fieldData => {
                            console.log("GLUTEN TAG-TITLE : " + fieldData);
                            return (
                                <div className='section-title-div' key={key}>
                                    <h3 className='section-title'>{fieldData}</h3>
                                    <p>TODO title</p>
                                </div>
                            )
                        })
                    }
                </>
            )
            break;
        case 'text':
            return (
                <>
                    {
                        props.sectionToDiplay.fieldData.map(fieldData => {
                            console.log("GLUTEN TAG-TEXT : " + fieldData);
                            return (
                                <div className='section-title-div' key={key}>
                                    <p className='section-text'>{fieldData}</p>
                                    <p>TODO text</p>
                                </div>
                            )
                        })
                    }
                </>
            )
            break;
        case 'image':
            return (
                <>
                    {
                        props.sectionToDiplay.fieldData.map(fieldData => {
                            console.log("GLUTEN TAG-IMAGE : " + fieldData);
                            return (
                                <div key={key}>
                                    <p>TODO Image</p>
                                </div>
                            )
                        })
                    }
                </>
            )
            break;
        case 'list':
            return (
                <>
                    {
                        props.sectionToDiplay.fieldData.map(fieldData => {
                            console.log("GLUTEN TAG-LIST : " + fieldData);
                            return (
                                <div key={key}>
                                    <p>TODO List</p>
                                </div>
                            )
                        })
                    }
                </>
            )
            break;
        case 'link':
            return (
                <>
                    {
                        props.sectionToDiplay.fieldData.map(fieldData => {
                            console.log("GLUTEN TAG-LINK : " + fieldData);
                            return (
                                <div className='section-title-div' key={key}>
                                    <p>TODO Link</p>
                                </div>
                            )
                        })
                    }
                </>
            )
            break;

        default:
            return <div>Cépété dans le switch</div>
            break;
    }
    return <div>Cépété, mais pas dans le switch</div>

}
