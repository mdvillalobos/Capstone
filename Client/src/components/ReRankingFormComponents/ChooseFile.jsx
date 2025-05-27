import { useState, useContext } from 'react'
import { UserContext } from '../../../context/userContext';
import { TbPdf, TbPng, TbJpg } from "react-icons/tb";
import { FaRegFolder } from "react-icons/fa6";
import { MdFolder } from "react-icons/md";

const ChooseFile = ({ handleExit, handleChangeFile }) => {
    const { credentials } = useContext(UserContext);
    const [ selectedType, setSelectedType ] = useState();
    const [ selectedFile, setSelectedFile ] = useState({
        filePath: '',
        fileName: '',
    })

    const selectedDocumentType = credentials?.files?.filter(doc => doc.type === selectedType);
    const documentType = Array.from(new Set(credentials?.files?.map(data => data.type)));

    console.log(selectedFile)

    return (
        <div className='modal'>
            <div className='w-[50%] bg-white shadow-md rounded-xl max-sm:w-[85%] max-md:w-[70%] max-lg:w-[50%] max-xl:w-[40%] fade-in'>
                <div className='relative flex justify-between px-6 py-4 border-b border-BorderColor'>
                    <div className='flex space-x-2'>
                        <div className='space-y-0.5'>
                            <p className='text-sm font-medium'>Upload Files</p>
                            <p className='text-xs text-TextSecondary'>Select and upload your documents.</p>
                        </div>
                    </div>
                
                    <button 
                        type="button" 
                        className="absolute right-4 px-2 top-5 rounded-full hover:bg-[#eae7e7] text-lg duration-200 border-2 border-BorderColor " 
                        onClick={handleExit}
                    >
                        &times;
                    </button> 
                </div>

                <div className='border-b-2 border-BorderColor'>
                    <div className='flex px-4 py-2 text-sm border-2'>
                        <MdFolder className='my-auto text-base'/>:
                        <span className='my-auto text-xs'>/</span>
                        {selectedType && <p className='ml-1'> {selectedType} <span className='my-auto text-xs'>/</span></p>}
                        <p className='ml-1'>{selectedFile.fileName !== '' ? selectedFile.fileName : ''}</p>
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex space-x-4'>
                        <div className='flex flex-col h-[60vh] px-2 py-2 space-x-2 space-y-0.5 overflow-y-auto text-left border-r-2 border-BorderColor w-65 overflow-x-hidden' >
                            {documentType.map((item, i) => (
                                <button 
                                    type='button' key={i}                
                                    onClick={() => { setSelectedType(item), setSelectedFile({ filePath: '', fileName: '' })}} 
                                    className={`flex space-x-2 text-sm text-left px-2.5 py-1.5 rounded-md cursor-pointer ${selectedType === item ? 'bg-gray-300' : 'text-TextSecondary'}`}
                                >
                                    <span className='my-auto text-base'><FaRegFolder/></span>
                                    <p className='w-full overflow-hidden text-sm text-ellipsis whitespace-nowrap'>{item}</p>
                                </button>
                            ))}
                        </div>
                        
                        <div className='flex flex-col flex-1 py-2 pr-4'> 
                            {selectedDocumentType.map((doc, i) => {
                                const fileName = doc.fileName.replace(/\.[^/.]+$/, "")
                                const fileType = doc.fileName.split('.').pop().toLowerCase();
                                return (
                                    <button 
                                        key={i} 
                                        type='button' 
                                        onClick={ () => setSelectedFile({ filePath: doc.filePath, fileName: doc.fileName })} 
                                        className={`w-full px-2 py-1.5 rounded-md cursor-pointer ${selectedFile.filePath === doc.filePath ? 'bg-gray-300' : ''}`}
                                    >
                                        <div className='flex space-x-2'>
                                            <div className='my-auto'>
                                                {fileType === 'pdf' ? (
                                                    <p className='p-1.5 rounded-md bg-[#ef676d]'><TbPdf className='text-xl text-white'/></p>
                                                ) : fileType === 'png' ?  (
                                                    <p className='p-1.5 rounded-md bg-[#4764aa]'><TbPng className='text-xl text-white'/></p>
                                                ) : (
                                                    <p className='p-1.5 rounded-md bg-[#4764aa]'><TbJpg className='text-xl text-white'/></p>
                                                )}
                                            </div>
                                            
                                            <div className='space-y-0.5 my-auto text-left'>
                                                <p className='overflow-hidden text-xs text-ellipsis whitespace-nowrap'>{fileName}</p>
                                                <p className='text-[0.7rem] text-TextSecondary'>{doc.type}</p>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className='flex justify-end mb-4 mr-4 space-x-4'>
                        <button 
                            type='button' 
                            onClick={handleExit} 
                            className='w-32 px-10 py-2 text-sm text-black duration-200 bg-gray-300 rounded-lg cursor-pointer hover:shadow-md' 
                        >
                            Cancel
                        </button>
                        <button 
                            type='button' 
                            onClick={() => {handleChangeFile(selectedFile), handleExit()}}
                            className='w-32 px-10 py-2 text-sm text-white duration-200 rounded-lg cursor-pointer hover:shadow-md bg-NuBlue' 
                        >
                            Select
                        </button>
                    </div>
                </div>
                    
            </div>
        </div>
    )
}

export default ChooseFile