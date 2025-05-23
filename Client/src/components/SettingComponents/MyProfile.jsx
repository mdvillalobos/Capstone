import { useState, useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';
import useUpdateProfile from '../../hooks/UserHooks/useUpdateProfile.jsx';
import maleProfile from '../../assets/images/male.png';
import femaleProfile from '../../assets/images/female.png';

const MyProfile = () => {
    const { UpdateProfile } = useUpdateProfile();
    const { user } = useContext(UserContext)
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ isEditEnabled, setIsEditEnabled ] = useState(false);
  
    const [ data, setData ] = useState({
        profile: null,
        lastName: user?.lastName,
        firstName: user?.firstName,
        middleName: user?.middleName, 
        contact: user?.contact,
        college: user?.college,
        department: user?.department,
        status: user?.status,
    });

    const departments = [
        { department: 'Nursing', college: 'College of Allied Health'},
        { department: 'Pharmacy', college: 'College of Allied Health'},
        { department: 'Medical Technology', college: 'College of Allied Health'},
        { department: 'Architecture', college: 'College of Architecture'},
        { department: 'Environmental Planning', college: 'College of Architecture'},
        { department: 'Accountancy', college: 'College of Business and Accountancy'},
        { department: 'Acccounting Information System', college: 'College of Business and Accountancy'},
        { department: 'Management Accounting', college: 'College of Business and Accountancy'},
        { department: 'Real State Management', college: 'College of Business and Accountancy'},
        { department: 'Financial Management', college: 'College of Business and Accountancy'},
        { department: 'Marketing Management', college: 'College of Business and Accountancy'},
        { department: 'Computer Science', college: 'College of Computing and Information Technologies'},
        { department: 'Information Technology', college: 'College of Computing and Information Technologies'},
        { department: 'Civil Engineering', college: 'College of Engineering'},
        { department: 'Computer Engineering', college: 'College of Engineering'},
        { department: 'Electrical Engineering', college: 'College of Engineering'},
        { department: 'Electronics Engineering', college: 'College of Engineering'},
        { department: 'Mechanical Engineering', college: 'College of Engineering'},
        { department: 'Environmental and Sanitary Engineering', college: 'College of Engineering'},
        { department: 'Hospitality Management', college: 'College of Hospitality & Tourism  Management'},
        { department: 'Tourism Management', college: 'College of Hospitality & Tourism  Management'},
    ];

    const collegeChoices = Array.from(new Set(departments?.map(colleges => colleges.college)));
    const filterDepartment = departments.filter(deparment => data.college ? deparment.college === data.college : false)
    
    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitted(true)
            await UpdateProfile(data.profile, data.lastName, data.firstName, data.middleName, data.contact, data.college, data.department, data.status);
        } finally {
            setIsSubmitted(false)
        }
    }
  
    return (
        <div className="px-2">
            <div className="setting-container">
                <p className='my-4 text-sm font-medium w-72'>Profile Picture</p>
            
                <div className="flex">
                    <div className="flex items-center justify-center w-20 h-20 mx-auto overflow-hidden border-2 border-gray-200 rounded-full">
                        {!data.profile ? (
                            user ? (
                            user.profilePicture ? (
                                <img src={user.profilePicture} alt="User Profile Picture" className='object-cover w-full h-full' />
                            ) : (
                                <img 
                                    src={user.sex === 'Male' ? maleProfile : femaleProfile} 
                                    alt="User Default Profile" 
                                    className='object-cover w-full h-full' 
                                />
                            )
                            ) : null
                        ) : (
                            <img src={URL.createObjectURL(data.profile)} alt="User Uploaded Profile" className='object-cover w-full h-full' />
                        )}
                    </div>
                </div>
                <label className={`ml-4 my-auto flex justify-center items-center w-48 border-2 border-NuBlue py-2 text-sm rounded-lg duration-300 hover:bg-NuLightBlue hover:border-NuLightBlue hover:text-white cursor-pointer ${!isEditEnabled && 'pointer-events-none'}`}>
                    <input type='file' className='hidden' accept="image/*" onChange={(e) => setData({ ...data, profile: e.target.files[0]})}/>
                    <p className='text-sm'>Upload a new photo</p>
                </label>
            </div>
    
            <div className="setting-container ">
                <p className='my-4 text-sm font-medium w-72'>Name</p>
                
                <div className="flex space-x-4 w-[40vw]">
                    <div className="setting-input-container">
                        <input type="text"
                            required
                            maxLength='50'
                            value={data.firstName} 
                            onChange={(e) => setData({...data, firstName: e.target.value})}
                            className={`setting-input pt-5 pb-2 peer ${!isEditEnabled && 'pointer-events-none'} `}
                        />
                        <span className='setting-input-label'>First Name</span>
                    </div> 
                
                    <div className="setting-input-container">
                        <input type="text"
                            maxLength='50'
                            value={data.middleName} 
                            onChange={(e) => setData({...data, middleName: e.target.value})}
                            className={`setting-input pt-5 pb-2 peer ${!isEditEnabled && 'pointer-events-none'} `}
                        />
                        <span className='setting-input-label'>Middle Name</span>
                    </div>   
                
                    <div className="setting-input-container">
                        <input type="text"
                            required
                            maxLength='50'
                            value={data.lastName} 
                            onChange={(e) => setData({...data, lastName: e.target.value})}
                            className={`setting-input pt-5 pb-2 peer ${!isEditEnabled && 'pointer-events-none'} `}
                        />
                        <span className='setting-input-label'>Last Name</span>
                    </div>
                </div>
            </div>
    
            {user.role === 'user' && (
                <>
                    <div className="setting-container">
                        <p className='my-4 text-sm font-medium w-72'>Contact No.</p>
                                
                        <div className="flex w-[40vw]">
                            <div className="setting-input-container">
                                <input type="text"
                                    value={data.contact} 
                                    maxLength='11'
                                    onChange={(e) => setData({...data, contact: e.target.value})}
                                    className={`setting-input py-3 ${!isEditEnabled && 'pointer-events-none'}`}
                                />
                            </div> 
                        </div>
                    </div>
    
                    <div className="setting-container">
                        <p className='my-4 text-sm font-medium w-72'>College</p>
                    
                        <div className="flex w-[40vw]">
                            <div className="setting-input-container">
                                <select value={data.college} onChange={(e) => setData({...data, college: e.target.value})} className={`setting-input py-3 ${!isEditEnabled && 'pointer-events-none'}`}>
                                    {collegeChoices.map(college => (
                                        <option key={college} value={college}>{college}</option>
                                    ))}
                                </select>
                            </div> 
                        </div>
                    </div>
    
                    <div className="setting-container">   
                        <p className='my-4 text-sm font-medium w-72'>College</p>
                                
                        <div className="flex w-[40vw]">
                            <div className="setting-input-container">
                                <select value={data.department} onChange={(e) => setData({...data, department: e.target.value})} className={`setting-input py-3 ${!isEditEnabled && 'pointer-events-none'}`}>
                                    {filterDepartment.map(department => (
                                        <option key={department.department} value={department.department}>{department.department}</option>
                                    ))}
                                </select>
                            </div> 
                        </div>
                    </div>
    
                    <div className="setting-container">
                        <p className='my-4 text-sm font-medium w-72'>Status</p>
                                
                        <div className="flex w-[40vw]">
                            <div className="setting-input-container">
                                <select value={data.status} onChange={(e) => setData({...data, status: e.target.value})} className={`setting-input py-3 ${!isEditEnabled && 'pointer-events-none'}`}>
                                    <option value="Fulltime">Fulltime</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Probation">Probation</option>
                                </select>
                            </div> 
                        </div>
                    </div>
                </>
            )}
    
            <div className="flex justify-end mt-4">
                {!isEditEnabled ? (
                    <button 
                        className='text-white setting-button bg-NuBlue hover:bg-NuLightBlue'
                        onClick={() => setIsEditEnabled(!isEditEnabled)}
                    >
                        Edit
                    </button>

                ) : (
                    <div className='flex space-x-4'>
                        <button className='bg-gray-300 setting-button' onClick={() => setIsEditEnabled(!isEditEnabled)}>Cancel</button>
                        <button 
                            className='text-white setting-button bg-NuBlue hover:bg-NuLightBlue'
                            onClick={updateProfile}
                        >
                            Save
                        </button>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default MyProfile