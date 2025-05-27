import { useState } from "react";
import useAddCredential from "../../../hooks/UserHooks/useAddCredential";
import useToast from "../../../hooks/Helpers/useToast";
import { FaFileAlt } from 'react-icons/fa';
import { AiOutlineCloudUpload } from "react-icons/ai";

const AddPerformanceModal = ({ data, setData }) => {
    const [ isTypeOpen, setIsTypeOpen ] = useState(false)
    const [ isStatusOpen, setIsStatusOpen ] = useState(false)
    const [ isRatingOpen, setIsRatingOpen ] = useState(false)
    const [ isSpesOpen, setIsSpesOpen ] = useState(false)

    console.log(data.tags)
    
    const type = [
        'OTE (Overall Teaching Effectiveness)'
    ]
    
    const status = [
        'New faculty',
        'On-board faculty',
    ]

    const newFacultyRating = [
        'At least 80',
		'At least 85',
		'At least 90',
    ]

    const oteRating = [
        'At least 5',
	    'At least 6'
    ]

    const spesRating = [
        'At least 4',
		'At least 5',
		'At least 6',
    ]

    const rating = data.tags[1] === 'New faculty' ? newFacultyRating : oteRating

    return (
        <div >
            <div className="relative">
                <button 
                    type='button' 
                    onClick={() => { setIsTypeOpen(!isTypeOpen), setIsStatusOpen(false) ,setIsRatingOpen(false), setIsSpesOpen(false) }} 
                    className={`w-full text-left fileInput ${data.documentType ? 'text-black' : 'text-gray-500'}`}
                >
                    {data.documentType || 'Select type of perfomance'}
                </button>

                {isTypeOpen && (
                    <div className="fileSelect">
                        {type.map(( typeOptions ) => (
                            <button 
                                key={typeOptions}
                                type='button'    
                                onClick={() => { 
                                    const newTags = [...data.tags || []]
                                    newTags[0] = typeOptions;
                                    setData({...data, documentType: typeOptions, tags: newTags }),
                                    setIsTypeOpen(!isTypeOpen)
                                }}
                                className='fileOption'
                            >
                                {typeOptions}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {data.documentType === 'OTE (Overall Teaching Effectiveness)' && (
                <>
                    <div className="relative">
                        <button 
                            type='button' 
                            onClick={() => { setIsStatusOpen(!isStatusOpen), setIsTypeOpen(false), setIsRatingOpen(false), setIsSpesOpen(false) }} 
                            className={`w-full text-left fileInput ${data.tags[1] ? 'text-black' : 'text-gray-500'}`}
                        >
                            {data.tags[1] || 'Select status'}
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

                    {data.tags[1] && (
                        <div className="relative">
                            <button 
                                type='button' 
                                onClick={() => { setIsRatingOpen(!isRatingOpen), setIsTypeOpen(false), setIsStatusOpen(false), setIsSpesOpen(false) }} 
                                className={`w-full text-left fileInput ${data.tags[2] ? 'text-black' : 'text-gray-500'}`}
                            >
                                {data.tags[2] ? data.tags[2] : data.tags[1] === 'New faculty' ? 'Select Rating' : 'Select OTE Rating'}
                            </button>

                            {isRatingOpen && (
                                <div className="fileSelect">
                                    {rating.map(( ratingOptions ) => (
                                        <button 
                                            key={ratingOptions}
                                            type='button'    
                                            onClick={() => { 
                                                const newTags = [...data.tags || []]
                                                newTags[2] = ratingOptions;
                                                setData({...data, tags: newTags }),
                                                setIsRatingOpen(!isRatingOpen)
                                            }}
                                            className='fileOption'
                                        >
                                            {ratingOptions}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {data.tags[1] === 'On-board faculty' && (
                        <div className="relative">
                            <button 
                                type='button' 
                                onClick={() => { setIsSpesOpen(!isSpesOpen), setIsTypeOpen(false), setIsStatusOpen(false), setIsRatingOpen(false) }} 
                                className={`w-full text-left fileInput ${data.tags[3] ? 'text-black' : 'text-gray-500'}`}
                            >
                                {data.tags[3] || 'Select SPES Rating' }
                            </button>

                            {isSpesOpen && (
                                <div className="fileSelect">
                                    {spesRating.map(( spesRatingOptions ) => (
                                        <button 
                                            key={spesRatingOptions}
                                            type='button'    
                                            onClick={() => { 
                                                const newTags = [...data.tags || []]
                                                newTags[3] = spesRatingOptions;
                                                setData({...data, tags: newTags }),
                                                setIsSpesOpen(!isSpesOpen)
                                            }}
                                            className='fileOption'
                                        >
                                            {spesRatingOptions}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default AddPerformanceModal