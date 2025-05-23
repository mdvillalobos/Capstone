import { useState } from "react";

const AddPublicationsModal = ({ data, setData }) => { 
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isWorksOpen, setIsWorksOpen ] = useState(false)
    const [ isPublishedOpen, setIsPublishedOpen ] = useState(false)

    const types = [
        'Works',
        'Q1 Publications'
    ]

    const works = [
        'Creative Work',
        'College Work',
        'Institutional Work',
        'Professional Work',
        'Scientific Work',
    ]

    const publishedOption = [
        'Scopus/ISI',
        'N/A'
    ]

    return (
        <div>
            <div className="relative">
                <button type='button' onClick={() => { setIsOpen(!isOpen), setIsPublishedOpen(false), setIsWorksOpen(false) }} className={`w-full text-left fileInput ${data.documentType ? 'text-black' : 'text-gray-500'}`}>
                    {data.documentType || 'Select type of work'}
                </button>

                {isOpen && (
                    <div className="fileSelect">
                        {types.map(( typesOption ) => (
                            <button 
                                key={typesOption}
                                type='button'    
                                onClick={() => { 
                                    const newTags = [[]]
                                    newTags[0] = typesOption;
                                    setData({...data, documentType: typesOption, tags: newTags }),
                                    setIsOpen(!isOpen)
                                }}
                                className='fileOption'
                            >
                                {typesOption}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {data.documentType === 'Works' && (
                <div className="relative">
                    <button type='button' onClick={() => { setIsWorksOpen(!isWorksOpen), setIsOpen(false), setIsPublishedOpen(false) }} className={`w-full text-left fileInput ${data.tags[1] ? 'text-black' : 'text-gray-500'}`}>
                        {data.tags[1] || 'Select type of work'}
                    </button>

                    {isWorksOpen && (
                        <div className="fileSelect">
                            {works.map(( worksOptions ) => (
                                <button 
                                    key={worksOptions}
                                    type='button'    
                                    onClick={() => { 
                                        const newTags = [...data.tags || []]
                                        newTags.splice(2, 1);
                                        newTags[1] = worksOptions;
                                        setData({...data, tags: newTags }),
                                        setIsWorksOpen(!isWorksOpen)
                                    }}
                                    className='fileOption'
                                >
                                    {worksOptions}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {['Creative Work', 'Scientific Work'].includes(data.tags[1]) && (
                <div className="relative">
                    <button type='button' onClick={() => { setIsPublishedOpen(!isPublishedOpen), setIsOpen(false), setIsWorksOpen(false) }} className={`w-full text-left fileInput ${data.tags[2] ? 'text-black' : 'text-gray-500'}`}>
                        {data.tags[2] || 'Select type of work'}
                    </button>

                    {isPublishedOpen && (
                        <div className="fileSelect">
                            {publishedOption.map(( publishedOptions ) => (
                                <button 
                                    key={publishedOptions}
                                    type='button'    
                                    onClick={() => { 
                                        const newTags = [...data.tags || []]
                                        newTags[2] = publishedOptions;
                                        setData({...data, tags: newTags }),
                                        setIsPublishedOpen(!isPublishedOpen) 
                                    }}
                                    className='fileOption'
                                >
                                    {publishedOptions}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default AddPublicationsModal