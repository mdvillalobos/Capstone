import { useState } from "react";

const AddProjectModal = ({ data, setData }) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isStatusOpen, setIsStatusOpen ] = useState(false)

    const typeOfProject = [
        'Externally funded project',
        'On-going commercialization/Start-up project',
    ]

    const status = [ 
        'Approved',
        'On-going'
    ]

    return (
        <div>
            <div className="relative">
                <button type='button' onClick={() => { setIsOpen(!isOpen), setIsStatusOpen(false)}} className={`w-full text-left fileInput ${data.documentType ? 'text-black' : 'text-gray-500'}`}>
                    {data.documentType || 'Select Type of Project'}
                </button>

                {isOpen && (
                    <div className="fileSelect">
                        {typeOfProject.map(( projectOptions ) => (
                            <button 
                                key={projectOptions}
                                type='button'    
                                onClick={() => { 
                                    const newTags = [[]]
                                    newTags[0] = projectOptions;
                                    setData({...data, documentType: projectOptions, tags: newTags }),
                                    setIsOpen(!isOpen) 
                                }}
                                className='fileOption'
                            >
                                {projectOptions}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {data.documentType === 'On-going commercialization/Start-up project' ? (
                <div className="relative">
                    <button type='button' onClick={() => { setIsStatusOpen(!isStatusOpen), setIsOpen(false)}} className={`w-full text-left fileInput ${!data.tags[1] ? 'text-gray-500' : null}`}>
                        {data.tags[1] || 'Select Status'}
                    </button>

                    {isStatusOpen && (
                        <div className="fileSelect">
                            {status.map(( statusOptions ) => (
                                <button 
                                    key={statusOptions}
                                    type='button'    
                                    onClick={() => { 
                                        const newTags = [...data.tags || []]
                                        newTags[1] = statusOptions;
                                        setData({...data, tags: newTags }),
                                        setIsStatusOpen(!isStatusOpen) 
                                    }}
                                    className='fileOption'
                                >
                                    {statusOptions}
                                </button>
                            ))}      
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    )
}

export default AddProjectModal