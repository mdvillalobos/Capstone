import { useState } from "react";

const AddExperienceModal = ({ data, setData }) => {

    const [ isOpen, setIsOpen ] = useState(false);
    const [ isWorkOptionOpen, setIsWorkOptionOpen ] = useState(false);

    const exprience = [
        'Relevant Industry',
        'Teaching Experience',
        'TESDA Teaching Experience',
        'Work Experience'
    ]

    const companyPositions = [
        'Middle management',
        'Top management'
    ]

    return (
        <div>
            <div className="relative">
                <button 
                    type='button' 
                    onClick={() => { setIsOpen(!isOpen), setIsWorkOptionOpen(false)}} 
                    className={`w-full text-left fileInput ${data.documentType ? 'text-black' : 'text-gray-500'}`}
                >
                    {data.documentType || 'Select type of experience '}
                </button>

                {isOpen && (
                    <div className="fileSelect">
                        {exprience.map(( experinceOptions ) => (
                            <button 
                                key={experinceOptions}
                                type='button'    
                                onClick={() => { 
                                    const newTags = [[]]
                                    newTags[0] = experinceOptions;
                                    setData({...data, documentType: experinceOptions, tags: newTags }),
                                    setIsOpen(!isOpen) 
                                }}
                                className='fileOption'
                            >
                                {experinceOptions}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {data.documentType === 'Work Experience' ? (
                <div className="relative">
                    <button 
                        type='button' 
                        onClick={() => { setIsWorkOptionOpen(!isWorkOptionOpen), setIsOpen(false)} } 
                        className={`w-full text-left fileInput ${data.tags[1] ? 'text-black' : 'text-gray-500'}`}
                    >
                        {data.tags[1] || 'Select your position'}
                    </button>

                    {isWorkOptionOpen && (
                        <div className="fileSelect">
                            {companyPositions.map(( positionOptions ) => (
                                <button 
                                    key={positionOptions}
                                    type='button'    
                                    onClick={() => { 
                                        const newTags = [...data.tags || []]
                                        newTags[1] = positionOptions;
                                        setData({...data, tags: newTags }),
                                        setIsOpen(!isOpen) 
                                    }}
                                    className='fileOption'
                                >
                                    {positionOptions}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : null }

            <input 
                type="number" 
                onChange={(e) => setData({ ...data, value: e.target.value }) } 
                placeholder='Years of experience' 
                className='fileInput'
            />
        </div>
    )
}

export default AddExperienceModal