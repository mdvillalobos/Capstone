import { useState, useContext } from 'react'
import { UserContext } from '../../../context/userContext';

const ChooseFile = ({ handleExit, handleChangeFile }) => {
    const { credentials } = useContext(UserContext);
    const [ selectedType, setSelectedType ] = useState();
    const [ selectedFile, setSelectedFile ] = useState({
        filePath: '',
        fileName: '',
    })

    const selectedDocumentType = credentials?.files?.filter(doc => doc.type === selectedType);
    const documentType = Array.from(new Set(credentials?.files?.map(data => data.type)));

    return (
        <div className='modal'>
            <div className='h-[50%] w-[30%] bg-white shadow-lg fade-in rounded-md px-5 py-5 max-sm:w-[85%] max-md:w-[70%] max-lg:w-[50%] max-xl:w-[40%]'>
                <div className='flex justify-between'>
                    <p>My Files</p>
                    <button type='button' onClick={handleExit}>&times;</button>
                </div>

                <div className='flex space-x-4'>
                    <div className='border-r-2'>
                        {documentType.map((item, i) => (
                            <button type='button' key={i} onClick={() => setSelectedType(item)} className='text-sm'>
                                {item}
                            </button>
                        ))}
                    </div>
                       
                    <div>
                        {selectedDocumentType.map((doc, i) => {
                            const fileName = doc.fileName.replace(/\.[^/.]+$/, "")
                            return (
                                <button 
                                    key={i} 
                                    type='button' 
                                    onClick={ () => setSelectedFile({ filePath: doc.filePath, fileName: doc.fileName})} 
                                    className={`${selectedFile.filePath === doc.filePath ? 'bg-gray-400' : ''}`}
                                >
                                    <p>{fileName}</p>
                                </button>
                            )
                        })}
                    </div>
                </div>

                <div>
                    <button type='button' onClick={() => {handleChangeFile(selectedFile), handleExit()}}>Open</button>
                    <button type='button' onClick={handleExit} >Cancel</button>
                </div>
                    
            </div>
        </div>
    )
}

export default ChooseFile