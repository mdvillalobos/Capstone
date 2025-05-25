import { useContext, useState, useEffect } from 'react'
import FormHeader from '../../components/AuthComponents/FormHeader.jsx';
import FormFooter from '../../components/AuthComponents/FormFooter.jsx';
import ProfileRegistrationForm from '../../components/AuthComponents/ProfileRegistrationForm.jsx';
import { UserContext } from '../../../context/userContext.jsx';
import LoadingSpinner from '../../components/Tools/LoadingSpinner.jsx';

const ProfileRegistration = () => {
    const { user } = useContext(UserContext);

    if(user === undefined) return <LoadingSpinner/>

    return (
        <div className='relative bg-[#f4f7f9] min-h-screen max-sm:h-full'>
            <FormHeader/>
            <div className="px-24 py-12 max-sm:px-10 font-Poppins">
                <div className="mb-4 text-center">
                    <h1 className='mb-2 text-5xl font-bold text-NuButton'>Almost there!</h1>
                    <p className='text-gray-500'>Kindly fill up all the necessary fields to continue.</p>
                </div>
                <div className="py-4 overflow-hidden bg-white shadow-md rounded-xl">
                    <ProfileRegistrationForm/> 
                </div>
            </div>
            <FormFooter/>
        </div>
    )
}

export default ProfileRegistration
