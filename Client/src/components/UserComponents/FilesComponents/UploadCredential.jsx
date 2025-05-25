import { useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { TbFileIsr } from "react-icons/tb";
import { RiUploadCloud2Line } from "react-icons/ri";

import useToast from '../../../hooks/Helpers/useToast';
import useAddCredential from '../../../hooks/UserHooks/useAddCredential';
import AddCredentialModal from './AddCredentialModal';
import AddEducationModal from './AddEducationModal';
import AddExperienceModal from './AddExperienceModal';
import AddProjectModal from './AddProjectModal';
import AddPublicationsModal from './AddPublicationsModal';
import AddRecogLicensesModal from './AddRecogLicensesModal';
import AddPerformanceModal from './AddPerformanceModal';
import LoadingAnimation from '../../../assets/animations/uploading.json';

const tagGroup = [
    'Academic & Educational Qualifications',
    'Experience',
    'Performance Evaluation',
    'Professional Recognition & Licensing',
    'Project Involvement',
    'Publications & Research',
    'Service & Contribution',
    'Technical Skills & Innovations',
];

const UploadCredential = () => {
    const [ isOpen, setIsOpen ] = useState(false);

    return (
        <div className='my-auto'>
            <button 
                type='button' 
                className='flex bg-NuBlue text-white rounded-xl px-5 py-2.5 text-xs hover:shadow-md hover:bg-NuLightBlue duration-200 cursor-pointer' 
                onClick={() => setIsOpen(true)}
            >
                <RiUploadCloud2Line className='my-auto mr-2 text-lg'/>
                Upload File
            </button>

            {isOpen ? (
                <ChoicesModal 
                    handleExit={() => setIsOpen(false)}
                />
            ) : null}
        </div>
    )
}
 
export default UploadCredential

const ChoicesModal = ({ handleExit }) => {
    const { Toast } = useToast();
    const { AddCredential } = useAddCredential();
    const [ isOpen, setIsOpen ] = useState(false);

    const [ uploading, setUploading ] = useState([])

    const [ data, setData ] = useState({
        documentCategory: '',
        documentType: '',
        file: null,
        value: null,
        tags: []
    });

    const handleAddCredential = async (e) => {
        e.preventDefault();
        if(!data.documentCategory || !data.documentType || !data.file ) {
            return Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            })
        }
        await AddCredential(data, setUploading, setIsOpen, setData);
    } 
    
    return (
        <div className="modal">
            <div className={`w-[50%] h-[65vh] bg-white shadow-md rounded-xl max-sm:w-[85%] max-md:w-[70%] max-lg:w-[50%] max-xl:w-[40%] fade-in`}>
                <form onSubmit={handleAddCredential} className='flex flex-col h-full'>
                    <div className='relative flex justify-between px-6 py-4 border-b border-gray-200'>
                        <div className='flex space-x-2'>
                            <span className='p-2 my-auto border-2 border-gray-200 rounded-full'>
                                <AiOutlineCloudUpload className='text-lg'/>
                            </span>
                            <div className='space-y-0.5'>
                                <p className='text-sm font-medium'>Upload Files</p>
                                <p className='text-xs text-NuLightText'>Select and upload your documents.</p>
                            </div>
                        </div>

                        <button type="button" className="absolute right-4 px-2 top-5 rounded-full hover:bg-[#eae7e7] text-lg duration-200 border-2 border-gray-200 " onClick={handleExit}>
                            &times;
                        </button> 
                    </div>

                    <div className='flex h-full px-8 py-5 space-x-4'>
                        <div className='relative flex flex-col w-1/2'>
                            <div className='relative flex flex-col items-center justify-center bg-[#fafafa] border-dashed border-2 border-gray-300 rounded-lg py-8 h-full'>
                                {data.file ? (
                                    <>
                                        <button 
                                            type='button' 
                                            className='absolute top-0 text-3xl text-gray-400 right-2'
                                            onClick={() => { setData({ ...data, file: null }) }}
                                        >
                                            &times;
                                        </button>
                                        <span className='text-3xl text-[#868686] p-2 bg-[#f7f7f7] rounded-full'>
                                            <TbFileIsr/>
                                        </span>
                                        <p className='text-sm text-[#868686] text-center'>{data.file.name}</p>
                                    </>
                                ) : (
                                    <>
                                        <span className='text-3xl text-[#868686] p-2 bg-[#f7f7f7] rounded-full'>
                                            <AiOutlineCloudUpload/>
                                        </span>
                                        <p className='text-sm text-[#868686] text-center'>
                                            Drag or drop <br/>files here, or 
                                            <span className='underline text-NuBlue'>Browse</span>
                                        </p>

                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            onChange={(e) => { setData({ ...data, file: e.target.files[0]}), e.target.value = '' }}
                                            accept=".png, .jpg, .jpeg, .pdf"
                                        />
                                    </>
                                )}
                            </div>

                            {uploading.length > 0 && (
                                <div className='absolute bottom-0 w-full px-3 py-2 fade-in'>
                                    <div className='relative flex py-4 bg-white rounded-md shadow-md pl-14 fade-in'>
                                        <span className='absolute -left-12 -top-2.5'>
                                            <Player
                                              src={LoadingAnimation}
                                              loop
                                              autoplay
                                              style={{ width: '10vw', height: '10vh' }}
                                            />
                                        </span>
                                        <p className='text-sm text-NuLightText'>Uploading files ({uploading.length} remaining)</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className='w-[50%] flex flex-col justify-between'>
                            <div>
                                <div className='relative'>
                                    <button 
                                        type='button' 
                                        onClick={() => setIsOpen(!isOpen)} 
                                        className={`flex justify-between w-full text-left fileInput ${data.documentType === null ? 'text-gray-500' : 'text-black'}`}
                                    >
                                        <span>{data.documentCategory || 'Type of Document' }</span>
                                        <span className='my-auto text-lg'>
                                            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown/>}
                                        </span>
                                    </button>

                                    {isOpen && (
                                        <div className='fileSelect'>
                                            {tagGroup.map(tagGroupOptions => (
                                                <button 
                                                    key={tagGroupOptions} 
                                                    type='button' 
                                                    className='fileOption' 
                                                    onClick={() => { setIsOpen(!isOpen),  setData({ ...data, documentCategory: tagGroupOptions, documentType: '', tags: [], value: null })}}
                                                >
                                                    {tagGroupOptions}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {data.documentCategory ? data.documentCategory === 'Academic & Educational Qualifications' ? (
                                    <AddEducationModal data={ data } setData={ setData } />
                                ) : data.documentCategory === 'Experience' ? (
                                    <AddExperienceModal data={ data } setData={ setData } />
                                ) :  data.documentCategory === 'Performance Evaluation' ? (
                                    <AddPerformanceModal data={ data } setData={ setData } />
                                ) : data.documentCategory === 'Professional Recognition & Licensing' ? (
                                    <AddRecogLicensesModal data={ data } setData={ setData }/>
                                ) : data.documentCategory === 'Project Involvement' ? (
                                    <AddProjectModal data={ data } setData={ setData } />
                                ) : data.documentCategory === 'Publications & Research' ? (
                                    <AddPublicationsModal data={ data } setData={ setData } />
                                ) : (
                                    <AddCredentialModal data={ data } setData={ setData } />
                                ) : null }
                            </div>
                            
                            <input type="submit" className='fileSubmit' value='Upload'/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
