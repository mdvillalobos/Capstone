import { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import Done from '../../../assets/images/done.webp';
import useCancelApplication from '../../../hooks/ApplicationHooks/useCancelEntry';
import { IoClose } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";
import { UserContext } from '../../../../context/userContext';
import { RankContext } from '../../../../context/rankContext';

const DisabledPage = () => {
    const { applicationData } = useContext(UserContext);
    const { config } = useContext(RankContext)
    const { cancelEntry } = useCancelApplication();
    const [ confirm, setConfirm ] = useState(false);

    const endDate = config?.reRankingStatus?.endDate ? new Date(config?.reRankingStatus.endDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    }) : '';

    const cancelSubmission = async () => {
       await cancelEntry(applicationData._id)
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
                    {applicationData.applicationStatus === 'For verification' ? (
                        <>
                            <h1 className='text-4xl font-medium'>Application Submitted Successfully!</h1>
                            <div className="space-y-4 text-gray-500">
                                <p>Thank you for applying for the position <b>{applicationData.applyingFor}</b>.Your application is currently <b>{applicationData.applicationStatus}</b> <br/>Our team will review your submitted application and will contact once it done.</p>
                                <p>We appreciate your submission. Thank you!</p>
                            </div>
                        </>
                    ) : applicationData.applicationStatus === 'Approved' ? ( 
                        <>
                            <h1 className='text-4xl font-medium'>Congratulations!</h1>
                            <div className="space-y-4 text-gray-500">
                                <p>Your applicationg for <b>{applicationData.applyingFor}</b> has been <b>{applicationData.applicationStatus}</b>. <br/>You new rank now promoted to <b>{applicationData.applyingFor}</b></p>
                            </div>
                        </>
                    ) : applicationData.applicationStatus === 'Decline' ? (
                        <>
                            <h1 className='text-4xl font-medium'>Better luck next time!</h1>
                            <div className="space-y-4 text-gray-500">
                                <p>We regret to inform you that your application for <b>{applicationData.applyingFor}</b> has been <b>{applicationData.applicationStatus}ed</b>.</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className='text-4xl font-medium'>HEads up!</h1>
                            <div className="space-y-4 text-gray-500">
                                <p>Your applicationg for <b>{applicationData.applyingFor}</b> has been <b>{applicationData.applicationStatus}ed</b>. <br/>Kindly review and resubmit your application until <b>{endDate}</b>. Thank you</p>
                            </div>
                        </>
                    )}
                </div>
                <div className="flex justify-center">
                    <div className="flex space-x-2">
                        <Link 
                            to='/application/myform' 
                            className='px-10 py-2 text-white duration-200 rounded-md cursor-pointer bg-NuBlue hover:bg-NuLightBlue' 
                        >
                            View my application
                        </Link>

                        {(applicationData.applicationStatus === 'For verification' || applicationData.applicationStatus === 'Return') && (
                            <button 
                                type='button' 
                                className='px-10 py-2 text-white duration-200 rounded-md cursor-pointer bg-NuRed hover:bg-red-600' 
                                onClick={() => setConfirm(true)}
                            >
                                Cancel Submission
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisabledPage
