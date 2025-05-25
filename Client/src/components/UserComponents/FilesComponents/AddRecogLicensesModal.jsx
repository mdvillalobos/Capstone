import { useState } from "react";

const AddFellowDiplomateModal = ({ data, setData }) => {
    const [ isOpen, setIsOpen ] = useState(false)
    const [ isChoicesOpen, setIsChoisesOpen ] = useState(false)

    const fellow = [
        'PRC accredited',
        'Dental Specialty',
        'Optometry Specialty',
        'Medical Specialty',
    ]

    const licenses = [
        'Dental Hygienist',
		'Dental Technologist'
    ]
    
    const types = {
        'Diplomate': fellow,
        'Fellow': fellow,
        'Licenses': licenses
    };
    
    const choices = types[data.documentType] || licenses;

    return (
        <div>
            <div className="relative">
                <button type='button' onClick={() => { setIsOpen(!isOpen), setIsChoisesOpen(false)}} className={`w-full text-left fileInput ${data.documentType ? 'text-black' : 'text-gray-500'}`}>
                    {data.documentType || 'Select Document Type'}
                </button>

                {isOpen && (
                    <div className="fileSelect">
                        {Object.keys(types).map((typesOptions) => (
                            <button 
                                key={typesOptions}
                                type='button'    
                                onClick={() => { 
                                    const newTags = [[]]
                                    newTags[0] = typesOptions;
                                    setData({...data, documentType: typesOptions, tags: newTags }),
                                    setIsOpen(!isOpen) 
                                }}
                                className='fileOption'
                            >
                                {typesOptions}
                            </button>
                        
                        ))}
                    </div>
                )}
            </div>

            {data.documentType ? (
                <div className="relative">
                    <button 
                        type='button'
                        onClick={() =>{ setIsChoisesOpen(!isChoicesOpen), setIsOpen(false)}} 
                        className={`w-full text-left fileInput ${data.tags[1] ? 'text-black' : 'text-gray-500'}`}
                    >
                        {data.tags[1] || 'Select '}
                    </button>

                    {isChoicesOpen && (
                        <div className="fileSelect">
                            {choices.map(( choicesOptions ) => (
                                <button 
                                    key={choicesOptions}
                                    type='button'    
                                    onClick={() => { 
                                        const newTags = [...data.tags || []]
                                        newTags[1] = choicesOptions;
                                        setData({...data, tags: newTags }),
                                        setIsChoisesOpen(!isChoicesOpen)
                                    }}
                                    className='fileOption'
                                >
                                    {choicesOptions}
                                </button>

                            ))}
                        </div>
                    )}
                </div>
            ) : null }
        </div>
    )
}

export default AddFellowDiplomateModal