import { memo, useContext, useState, useCallback } from 'react';
import { UserContext } from '../../../context/userContext.jsx';
import { TbPdf, TbJpg, TbPng } from "react-icons/tb";
import ViewFile from '../Tools/ViewFile.jsx';
import ChooseFile from './ChooseFile.jsx';

const RequirementFields = ({ requirementDescription, userDocuments, setRequirements = () => {}, isEditEnable = false, handleChangeRemarks = () => {} }) => {
    const { user } = useContext(UserContext);
    const description = String(requirementDescription).split('\n');

    const [ isFileShow, setIsFileShow ] = useState({
        show: false,
        fileIndex: '',
        requirementNumber: ''
    });
    
    const [ isImageshow, setIsImageShow ] = useState({
        show: false,
        filePath: '',
        fileName: '',   
    });
 
    const handleShowImage = useCallback((filePath, fileName, date) => {
         setIsImageShow({ show: true, filePath: filePath, fileName: fileName, date: date })
    }, [])

    const handleChangeFile = (requirementNumber, fileIndex, fileData) => {
        setRequirements(prev =>
            prev.map(req => req.requirementNumber === requirementNumber
                ? {
                    ...req,
                    files: req.files.map((file, index) =>
                        index === fileIndex
                            ? { ...file, ...fileData}
                            : file
                    )
                }
                : req
            )
        );
    };

    const handleAddFile = (requirementNumber) => {
        setRequirements(prev =>
            prev.map(req =>
                req.requirementNumber === requirementNumber
                    ? {
                        ...req,
                        files: [...req.files, { filePath: null, fileName: null }]
                    }
                    : req
            )
        );
    };
    
    return (
        <div className=''>
            {isImageshow.show && (
                <ViewFile
                    handleExit ={() => setIsImageShow({ show: false })}
                    data = { isImageshow }
                />
            )}
            
            {isFileShow.show && (
                <ChooseFile 
                    handleExit = {() => setIsFileShow({ show: false })}
                    handleChangeFile = {(fileData) => handleChangeFile(isFileShow.requirementNumber, isFileShow.fileIndex, fileData)}
                />
            )}

            <div className='py-5 border-b-2 border-NuBlue max-sm:flex-col max-sm:space-y-2'>
                <div className='flex flex-col space-y-4'>
                    <div className='text-sm space-y-0.5 max-sm:w-full'>
                        {description.map((des, index) => (
                          index === 0 ? (
                            <p key={index} className='font-medium'> {des.trim()}</p> 
                          ) : (
                            <p key={index}>{des.trim()}</p>
                          )
                        ))} 
                    </div>

                    <div className='flex flex-col'>
                        <p className='mb-1 text-sm font-medium text-NuBlue'>Attached Documents:</p>
                        <div className='flex space-x-2'>
                            {userDocuments.files.map((file, i) => {
                                const fileType = file.fileName ? file.fileName.split('.').pop().toLowerCase() : null
                                const formattedDate = new Date(file.date_uploaded).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                });
                                return (
                                    <div key={i}>
                                        {file.filePath ? (
                                            <>
                                                <button 
                                                    type='button'
                                                    className='relative z-0 w-48 px-2 overflow-hidden text-sm duration-300 border-2 rounded-md cursor-pointer h-13 border-BorderColor hover:bg-NuLightBlue hover:border-NuLightBlue hover:text-white'
                                                    onClick={() => handleShowImage(file.filePath, file.fileName)}
                                                >
                                                    <div type="button" className='flex space-x-2'>
                                                        {fileType === 'pdf' ? (
                                                            <p className='rounded-md bg-[#ef676d] p-1'><TbPdf className='text-lg text-white'/></p>
                                                        ) : fileType === 'png' ?  (
                                                            <p className='rounded-md bg-[#ef676d] p-1'><TbPng className='text-lg text-white'/></p>
                                                        ) : (
                                                            <p className='rounded-md bg-[#ef676d] p-1'><TbJpg className='text-lg text-white'/></p>
                                                        )}
                                                        <p className='w-[70%] my-auto overflow-hidden text-left text-ellipsis whitespace-nowrap'>{file.fileName}</p>
                                                    </div>
                                                    {user.role === 'user' ? (
                                                        isEditEnable && (
                                                            <div 
                                                                type='button' 
                                                                onClick={(e) => { e.stopPropagation(), handleChangeFile(userDocuments.requirementNumber, i, {filePath: null, fileName: null})}} 
                                                                className='absolute z-10 text-xl right-2 top-2.5'
                                                            >
                                                                &times;
                                                            </div>
                                                        )
                                                    ) : null}
                                                </button>
                                            </>
                                        ) : (
                                            isEditEnable ? (
                                                user.role === 'user' && (
                                                    <button 
                                                        type='button'
                                                        className='flex items-center justify-center w-48 px-2 overflow-hidden text-sm duration-300 border-2 rounded-md cursor-pointer h-13 border-BorderColor hover:bg-NuLightBlue hover:border-NuLightBlue hover:text-white'
                                                        onClick={() => setIsFileShow({ show: true, requirementNumber: userDocuments.requirementNumber, fileIndex: i })}
                                                    >
                                                        Select a file
                                                    </button>
                                                )
                                            ) : (
                                                <p className='flex justify-center items-center border-2 border-BorderColor py-3.5 px-2 text-sm rounded-md w-52 overflow-hidden h-13'>
                                                    No attached document
                                                </p>
                                            )
                                        )}
                                    </div>
                                )
                            })}
                            {userDocuments.files.every(file => file.filePath) && isEditEnable && user.role === 'user' && (
                                <button
                                    type='button'
                                    onClick={() => handleAddFile(userDocuments.requirementNumber)}
                                    className='px-3 py-1 text-xl font-semibold text-black duration-200 border-2 rounded rounded-md border-BorderColor hover:bg-NuLightBlue hover:border-NuLightBlue'
                                >
                                    +
                                </button>
                            )}
                        </div>
                    </div>

                    {user.role === 'admin' && (
                        <div className='flex flex-col'>
                            <p className='mb-1 text-sm font-medium text-NuBlue'>Remarks:</p>
                            <textarea
                                className='border-2 border-BorderColor py-2 px-3 text-sm focus-within:border-[#93adc2] outline-none rounded-md h-16' 
                                placeholder='Enter your remarks here..'
                                onChange={(e) => handleChangeRemarks(e.target.value)}
                            />

                        </div>
                        
                    )}
                </div>
            </div>
        </div>
    )
}

export default memo(RequirementFields)
