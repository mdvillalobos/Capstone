import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import SearchFile from '../UserComponents/FilesComponents/SearchFile';
import UploadCredential from '../UserComponents/FilesComponents/UploadCredential';
import { LuBell } from "react-icons/lu";
import maleProfile from '../../assets/images/male.png';
import femaleProfile from '../../assets/images/female.png';

const Header = ({ pageTitle, pageDescription, destination = '' }) => {
    const { user } = useContext(UserContext);

    return (
        <div className='flex justify-between text-TextPrimary'>
            <div className='flex'>
                <div className='my-auto space-y-0.5'>
                    <h1 className='text-xl font-semibold'>{pageTitle}</h1>
                    <p className='text-xs text-TextSecondary'>{pageDescription}</p>
                </div>
            </div>

            <div className='flex space-x-8'>
                {destination === 'Dashboard' ? (
                    <div className='flex my-auto space-x-4'>
                        <SearchFile/>
                        <UploadCredential/>
                    </div>
                ) : null }
                
                
                <div className='flex space-x-5'> 
                    <div className='flex my-auto space-x-2'>
                        {user.profilePicture ? (
                            <div className='flex justify-center h-[35px] w-[36px] overflow-hidden rounded-full my-auto'>
                                <img src={user.profilePicture} alt="User Profile" className='object-cover w-full h-full'/>
                            </div>
                        ) : (
                            user.sex === 'Male' ? (
                                <img src={maleProfile} alt="User Profile" className='w-10 h-10 my-auto rounded-md' />
                            ) : (
                                <img src={femaleProfile} alt="User Profile" className='w-10 h-10 my-auto rounded-md' />
                            )
                        )}
                    </div>
                </div>
            </div>   
        </div>
    )
}

export default Header
