import { useState } from "react";

const AddEducationModal = ({ data, setData }) => {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isDegreeOpen, setIsDegreeOpen ] = useState(false)
    const [ isAlignedOpen, setIsAlignedOpen ] = useState(false);

    console.log(data.tags)
    
    const documentTypes = [ 
        'Educational Attainment',
        'Seminar Attendance',
        'Seminar Speakership',
        'Training',
        'TESDA Graduate',
        'TESDA Certified',
    ]

    const degrees = [
        'Bachelor\'s Degree',
        'Bachelor\'s of Law',
        'Master\'s Degree',
        'Doctorate Degree',
        'Post-baccalaureate Degree',
        'Post Graduate Diploma'
    ];

    const alignmentData = [
        'Aligned',
        'Allied',
        'N/A'
    ]

    return (
        <div>
            <div className='relative'>
                <button 
                    type='button' 
                    onClick={() =>{ setIsOpen(!isOpen), setIsAlignedOpen(false), setIsDegreeOpen(false) } } 
                    className={`fileInput ${data.documentType ? 'text-black' : 'text-gray-500'}`}
                >
                    {data.documentType ||  'Select document type'}
                </button>

                {isOpen && (
                    <div className='fileSelect'>
                        {documentTypes.map((documentTypesOptions) => (
                            <button 
                                key={documentTypesOptions}
                                type='button' 
                                onClick={() => { 
                                    const newTags = [[]]
                                    newTags[0] = documentTypesOptions;
                                    setData({ ...data, documentType: documentTypesOptions, tags: newTags }),
                                    setIsOpen(!isOpen)
                                }}
                                className='fileOption'
                            >
                                {documentTypesOptions}
                            </button>
                        ))}             
                    </div>
                )}
            </div>

            {data.documentType === 'Educational Attainment' && (
                <>
                    <div className='relative w-full'>
                        <button 
                            type='button' 
                            onClick={() => { setIsDegreeOpen(!isDegreeOpen), setIsOpen(false), setIsAlignedOpen(false)}} 
                            className={`fileInput ${data.tags[1] ? 'text-black' : 'text-gray-500'}`}
                        >
                            {data.tags[1] || 'Select Education Degree'}
                        </button>
                        {isDegreeOpen && (
                            <div className='fileSelect'>
                                {degrees.map((degreesOptions) => (
                                    <button 
                                        key={degreesOptions}
                                        type='button' 
                                        onClick={() => { 
                                            const newTags = [...data.tags || []]
                                            newTags[1] = degreesOptions;
                                            if(!['Doctorate Degree', 'Master\'s Degree'].includes(newTags[1])) {
                                                data.value = null
                                            }
                                            setData({ ...data, tags: newTags }), 
                                            setIsDegreeOpen(!isDegreeOpen)
                                        }}
                                        className='fileOption'
                                    >
                                        {degreesOptions}
                                    </button>
                                ))}     
                            </div>
                        )}
                    </div>

                    <div className='relative w-full'>
                        <button 
                            type='button' 
                            onClick={() => { setIsAlignedOpen(!isAlignedOpen), setIsOpen(false), setIsDegreeOpen(false)}} 
                            className={`fileInput ${data.tags[2] ? 'text-black' : 'text-gray-500'}`}
                            disabled={data.tags[1] === 'Bachelor\'s of Law'}
                        >
                            {data.tags[2] || 'Select Alignment'}
                        </button>
                        {isAlignedOpen && (
                            <div className='fileSelect'>
                                {alignmentData.map((alignmentOptions) => (
                                    <button 
                                        key={alignmentOptions}
                                        type='button' 
                                        onClick={() => { 
                                            const newTags = [...data.tags || []]
                                            newTags[2] = alignmentOptions;
                                            setData({ ...data, tags: newTags }), 
                                            setIsAlignedOpen(!isAlignedOpen)
                                        }}
                                        className='fileOption'
                                    >
                                        {alignmentOptions}
                                    </button>
                                ))}     
                            </div>
                        )}
                    </div>

                    <input 
                        type="text" 
                        className="fileInput" 
                        placeholder='Completed Units' 
                        onChange={(e) => setData({ ...data, value: e.target.value})} 
                        disabled = {!['Doctorate Degree', 'Master\'s Degree'].includes(data.tags[1])}
                    />
                </>
            )}

        </div>
    )
}

export default AddEducationModal