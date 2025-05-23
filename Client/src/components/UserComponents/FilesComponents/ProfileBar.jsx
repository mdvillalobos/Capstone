import { useContext } from 'react';
import { UserContext } from '../../../../context/userContext';
import { TbPdf, TbJpg, TbPng } from "react-icons/tb";
import { HiOutlineMail } from "react-icons/hi";
import { IoFootsteps } from "react-icons/io5";
import { LuBuilding } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa";
import { IoFemale, IoMale } from "react-icons/io5";
import maleProfile from '../../../assets/images/male.png';
import femaleProfile from '../../../assets/images/female.png';

const ProfileBar = () => {
    const { credentials, user } = useContext(UserContext);

    const recentFiles = credentials?.files
        .filter(doc => doc.isActive)
        .slice(-5)
        .reverse();
  
    return (
        <div className='flex flex-col h-full space-y-4 z w-72'>
            <div className='px-5 py-6 space-y-8 border border-gray-200 rounded-xl'>
                <div className='flex flex-col items-center space-y-4'>
                    <div className='p-1 border-2 rounded-full border-NuLightBlue'>
                        {user.profilePicture ? (
                            <div className='flex justify-center w-20 h-20 overflow-hidden rounded-full'>
                                <img src={user.profilePicture} alt="User Profile" className='object-cover w-full h-full'/>
                            </div>
                        ) : (
                            user.sex === 'Male' ? (
                                <img src={maleProfile} alt="User Profile" className='w-20 h-20' />

                            ) : (
                                <img src={femaleProfile} alt="User Profile" className='w-20 h-20' />
                            )
                        )}
                    </div>

                    <div className="my-auto font-medium text-[#393a40] text-center">
                        <p className='my-auto text-sm'>{user.firstName} {user.lastName}</p>
                        <p className='text-xs text-NuBlue'>{user.rank}</p>
                    </div>
                </div>

                <div className='flex items-center justify-center space-x-2'>
                
                    <div className='relative group'>
                        <p className='profileText '>
                            {user.college}
                        </p>
                        <div className='profileIcon'>
                            <FaGraduationCap/>
                        </div>
                    </div>


                    <div className='relative group'>
                        <p className='profileText '>
                            {user.department}
                        </p>
                        <div className='profileIcon'>
                            <LuBuilding/>
                        </div>
                    </div>

                    <div className='relative group'>
                        <p className='profileText'>
                            {user.email}
                        </p>
                        <div className='profileIcon'>
                            <HiOutlineMail/>
                        </div>
                    </div>

                    <div className='relative group '>
                        <p className='profileText'>
                            {user.track}
                        </p>
                        <div className='profileIcon'>
                            <IoFootsteps/>
                        </div>
                    </div>

                    <div className='relative group'>
                        <p className='profileText'>
                            {user.sex}
                        </p>
                        <div className='profileIcon'>
                            {user.sex === 'Male' ? <IoMale /> : <IoFemale />}
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col flex-1 px-5 py-4 space-y-5 overflow-hidden border border-gray-200 rounded-xl'>
                <p className='text-lg font-medium'>Recently Uploaded</p>

                {recentFiles ? 
                    recentFiles?.map((doc, i) => {
                        const fileName = doc.fileName.replace(/\.[^/.]+$/, "");
                        const fileType = doc.fileName.split('.').pop().toLowerCase();
                         const formattedDate = new Date(doc.date_uploaded).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                        });
                    
                        return (
                            <div key={i} className='flex space-x-3'>
                                <div className='my-auto'>
                                   {fileType === 'pdf' ? (
                                        <p className='p-1.5 rounded-md bg-[#ef676d]'><TbPdf className='text-xl text-white'/></p>
                                    ) : fileType === 'png' ?  (
                                        <p className='p-1.5 rounded-md bg-[#4764aa]'><TbPng className='text-xl text-white'/></p>
                                    ) : (
                                        <p className='p-1.5 rounded-md bg-[#4764aa]'><TbJpg className='text-xl text-white'/></p>
                                    )}
                                </div>
                                <div className='space-y-0.5'>
                                    <p className='overflow-hidden text-sm text-ellipsis whitespace-nowrap w-52'>{fileName}</p>
                                    <p className='text-xs text-NuLightText'>{formattedDate}</p>
                                </div>
                            </div>
                        )
                    })
                : (
                    <>tae</>
                )}
            </div>
        </div>
    )
}

export default ProfileBar