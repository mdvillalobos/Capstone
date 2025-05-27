import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Done from '../../../assets/images/done.webp';
import useCancelApplication from '../../../hooks/ApplicationHooks/useCancelEntry';
import { IoClose } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";

const DisabledPage = ({ rest }) => {
    const navigate = useNavigate();
    const { cancelEntry } = useCancelApplication();
    const [ confirm, setConfirm ] = useState(false);

    const viewSubmitted = (rest) => {
        navigate('/application/myform', { state: { myForm: rest }})
    }

    const cancelSubmission = async () => {
       await cancelEntry(rest._id)
    }

    return (
        <div className="content-center">
            {confirm ? (
                <>
                    <div className='modal'>
                        <div className="w-[30%] bg-white rounded-3xl shadow-lg px-8 py-8 fade-in max-sm:w-[85%] max-md:w-[70%] max-lg:w-[50%] max-xl:w-[40%]">
                            <div className="space-y-2">
                                <div className="relative">
                                    <button type="button" className="absolute right-[-20px] top-[-25px] p-2 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c] text-2xl duration-200" onClick={() => setConfirm(false)}>
                                        <IoClose/>
                                    </button> 
                                </div>
                        
                                <div className="flex justify-center">
                                    <div className='bg-[#fae9e9] p-2.5 rounded-full'>
                                        <div className='bg-[#f6d8d7] p-2.5 rounded-full'>
                                            <div className='bg-NuRed p-2.5 rounded-full'>
                                                <BsQuestionLg className='text-xl text-white'/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        
                                <div className="">
                                    <p className='text-3xl font-semibold tracking-tight text-center'>Are you sure?</p>
                                    <p className='m-5 text-sm text-center text-gray-600'>Are you sure you want to cancel your application?</p>
                                </div>
                        
                                <div className="flex space-x-1.5">
                                    <button type='button' className='w-full py-2 text-sm duration-300 border-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-300 hover:border-gray-300' onClick={() => setConfirm(false)}>Cancel</button>
                                    <button type='button' className='w-full py-2 text-sm text-white duration-300 rounded-lg cursor-pointer border-NuRed bg-NuRed hover:bg-red-600' onClick={cancelSubmission}>Confirm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                null
            )}
            <div className='flex flex-col space-y-6'>
                <img src={Done} alt="" className='w-64 h-48 mx-auto'/>
                <div className="space-y-4 text-center">
                    <h1 className='text-4xl font-medium'>Application Submitted Successfully!</h1>
                    <div className="space-y-4 text-gray-500">
                        <p>Thank you for applying for the position <b>{rest.applyingFor}</b>.Your application is currently <b>For Approval</b> <br/>Our team will review your submitted application and will contact once it done.</p>
                        <p>We appreciate your submission. Thank you!</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex space-x-2">
                        <button type='button' className='px-10 py-2 text-white duration-200 rounded-md cursor-pointer bg-NuBlue hover:bg-NuLightBlue' onClick={() => viewSubmitted(rest)}>View my application</button>
                        <button type='button' className='px-10 py-2 text-white duration-200 rounded-md cursor-pointer bg-NuRed hover:bg-red-600' onClick={() => setConfirm(true)}>Cancel Submission</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisabledPage
