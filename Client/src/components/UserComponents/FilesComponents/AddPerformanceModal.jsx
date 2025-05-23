import { useState } from "react";
import useAddCredential from "../../../hooks/UserHooks/useAddCredential";
import useToast from "../../../hooks/Helpers/useToast";
import { FaFileAlt } from 'react-icons/fa';
import { AiOutlineCloudUpload } from "react-icons/ai";

const AddPerformanceModal = ({ credentialType }) => {
    /* const status = [
        'New faculty',
        'On-board faculty',
    ]

    return (
        <form className="relative">
            <div className="relative">
                <button type='button' onClick={() => { setIsStatusOpen(!iStatusOpen) }} className={`w-full text-left fileInput ${data.category ? 'text-black' : 'text-gray-500'}`}>
                    {data.category || 'Select type of work'}
                </button>

                {iStatusOpen && (
                    <div className="fileSelect">
                        {status.map(( statusOptions ) => (
                            <button 
                                key={statusOptions}
                                type='button'    
                                onClick={() => { 
                                    const newTags = [...data.tags || []]
                                    newTags[1] = statusOptions;
                                    setData({...data, category: statusOptions, tags: newTags }),
                                    setIsStatusOpen(!iStatusOpen)
                                }}
                                className='fileOption'
                            >
                                {statusOptions}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {data.category === 'New faculty' ? (
                <div className="relative">
                    <button type='button' onClick={() => setIsAverageOpen(!isAvaerageOpen)} className={`w-full text-left fileInput ${data.deansEval ? 'text-black' : 'text-gray-500'}`}>
                        {data.deansEval || 'Deans Evaluation'}
                    </button>

                    {isAvaerageOpen && (
                        <div className="fileSelect">
                            {newFacultyaverage.map(( averageOptions ) => (
                                <button 
                                    key={averageOptions}
                                    type='button'    
                                    onClick={() => { 
                                        const newTags = [...data.tags || []]
                                        newTags[2] = averageOptions;
                                        setData({...data, deansEval: averageOptions, tags: newTags }),
                                        setIsAverageOpen(!isAvaerageOpen) 
                                    }}
                                    className='fileOption'
                                >
                                    {averageOptions}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ) : data.category === 'On-board faculty' ? (
                <div className="">
                    <div className="relative">
                        <button type='button' onClick={() => setIsOteOpen(!isOteOpen)} className={`w-full text-left fileInput ${data.oteRating ? 'text-black' : 'text-gray-500'}`}>
                            {data.oteRating || 'OTE Rating'}
                        </button>

                        {isOteOpen && (
                            <div className="fileSelect">
                                {ote.map(( oteOptions ) => (
                                    <button 
                                        key={oteOptions}
                                        type='button'    
                                        onClick={() => { 
                                            const newTags = [...data.tags || []]
                                            newTags[2] = oteOptions;
                                            setData({...data, oteRating: oteOptions, tags: newTags }),
                                            setIsOteOpen(!isOteOpen) 
                                        }}
                                        className='fileOption'
                                    >
                                        {oteOptions}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <button type='button' onClick={() => setIsSpesOpen(!isSpesOpen)} className={`w-full text-left fileInput ${data.spesRating ? 'text-black' : 'text-gray-500'}`}>
                            {data.spesRating || 'SPES Rating'}
                        </button>
                    
                        {isSpesOpen && (
                            <div className="fileSelect">
                                {spes.map(( spesOptions ) => (
                                    <button 
                                        key={spesOptions}
                                        type='button'    
                                        onClick={() => { 
                                            const newTags = [...data.tags || []]
                                            newTags[3] = spesOptions;
                                            setData({...data, spesRating: spesOptions, tags: newTags }),
                                            setIsSpesOpen(!isSpesOpen) 
                                        }}
                                        className='fileOption'
                                    >
                                        {spesOptions}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : null }

        </form>
    ) */
}

export default AddPerformanceModal