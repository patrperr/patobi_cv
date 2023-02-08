import { Section } from '../types'
import './CVDisplayerAndSection.css'
// import testImage from '../cvRessources/images/Robin.jpg'

export default function CPSection(props: {
    sectionToDiplay: Section,
    isChild: boolean,
    key?: string,
    similarElements?: number,
    position?: number,
    level:number
}): JSX.Element {

    let childLevel : number = props.level;
    let baseKey = props.key + "-" + props.sectionToDiplay.fieldType + props.position;
    let keyNumber: number = 0;
    let key: string;
    let ChildPosition: number = -1;

    if (props.isChild) {
        if (props.position && props.position && props.key && props.key) {
            key = baseKey;
        }
    } else {
        key = "CV-" + props.sectionToDiplay.fieldType;
    }


    switch (props.sectionToDiplay.fieldType) {
        case 'section':
            ChildPosition = -1;
            childLevel++;

            let sectionclassName = "";
            if(childLevel > 2){
                sectionclassName = "subsection-div";
            }else{  sectionclassName = "section-div"}

            return (
                <div className={sectionclassName} >
                    <div className='section-title-div'>
                        <h3 className='section-main-title'>{props.sectionToDiplay.title}</h3>
                    </div>
                    <div className='section-content-container'>
                        <>
                            {
                                props.sectionToDiplay.fieldData.map(subsectiondata => {
                                    ChildPosition++;
                                    let subsection: Section;
                                    let temp = subsectiondata as unknown;
                                    subsection = temp as Section;
                                    keyNumber++;
                                    key = baseKey + keyNumber;

                                    // console.log(subsectiondata);
                                    return <div key={key} className="section-parent-div">
                                        <CPSection sectionToDiplay={subsection} level={childLevel} isChild={true} similarElements={props.sectionToDiplay.fieldData.length} position={ChildPosition} />
                                    </div>
                                })

                            }
                        </>
                    </div>
                </div>
            );
        case 'title':
            return (
                <>
                    {
                        props.sectionToDiplay.fieldData.map(fieldData => {
                            keyNumber++;
                            key = baseKey + keyNumber;
                            return (
                                <div className='section-title-div' key={key}>
                                    <h3 className='section-title'>{fieldData}</h3>
                                </div>
                            )
                        })
                    }
                </>
            )
        case 'text':
            return (
                <>
                    {
                        props.sectionToDiplay.fieldData.map(fieldData => {
                            keyNumber++;
                            key = baseKey + keyNumber;
                            return (
                                <div className='section-text-div' key={key}>
                                    <p className='section-text'>{fieldData}</p>
                                </div>
                            )
                        })
                    }
                </>
            )
        case 'image':
            return (
                <>
                    {
                        props.sectionToDiplay.fieldData.map(fieldData => {
                            keyNumber++;
                            key = baseKey + keyNumber;
                            let imgSrc = '../images/' + fieldData;
                            // console.log("imgSrc : " + imgSrc)
                            return (
                                <div key={key}>
                                    <img src={imgSrc} alt={imgSrc}></img>
                                    {/* <img src={testImage}></img> */}
                                    <span>TODO Image</span>
                                </div>
                            )
                        })
                    }
                </>
            )
        case 'list':
            return (
                <>
                    <div className='section-list-div'>
                        {
                            props.sectionToDiplay.fieldData.map(fieldData => {
                                keyNumber++;
                                key = baseKey + keyNumber;
                                return (
                                    <div className='section-list-element-div' key={key}>
                                        <p className='section-list-element'>{fieldData}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
            )
        case 'link':
            return (
                <>
                    {
                        props.sectionToDiplay.fieldData.map(fieldData => {
                            keyNumber++;
                            key = baseKey + keyNumber;
                            let link: string = "https://" + fieldData;

                            return (
                                <div className='section-link-div' key={key}>
                                    <p className='.section-link'><a rel="noreferrer" target={"_blank"} href={link}>{fieldData}</a></p>
                                </div>
                            )
                        })
                    }
                </>
            )
        default:
            return <div>Cépété dans le switch</div>
    }
    //return <div>Cépété, mais pas dans le switch</div>

}
