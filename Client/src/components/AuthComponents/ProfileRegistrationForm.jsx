import { useContext, useState } from 'react'
import useRegisterProfile from '../../hooks/AuthHooks/useRegisterProfile';
import { RankContext } from '../../../context/rankContext';
import useToast from '../../hooks/Helpers/useToast';
import Default from '../../assets/images/Default.webp';
import { MdError } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";

const ProfileRegistrationForm = () => {
  const { Toast } = useToast();
  const { ranks } = useContext(RankContext);
  const { registerProfile } = useRegisterProfile();
  const [ isSubmitted, setIsSubmitted ] = useState(false);

  const [ data, setData ] = useState({
    profilePicture: null,
    lastName: '', 
    firstName: '',
    middleName: '',
    contact: '',
    sex: '',
    status: '',
    track: '', 
    rank: '',
    college: '',
    department: '', 
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
  ]

  const collegeChoices = Array.from(new Set(departments?.map(colleges => colleges.college)));
  const filterDepartment = departments.filter(deparment => data.college ? deparment.college === data.college : false)

  const trackOptions = Array.from(new Set(ranks?.map(rank => rank.track)));
  const filteredRank = ranks?.filter(rank => data.track ? rank.track === data.track : false);

  const RegisterUserInfo = async (e) => {
    e.preventDefault();

    const fieldsToCheck = [
      data.lastName,
      data.firstName, 
      data.contact,
      data.sex,
      data.status,
      data.track,
      data.rank,
      data.department,
      data.college,
    ];
    
    if (fieldsToCheck.some(field => field.trim() === '')) {
      return Toast.fire({
        icon: 'error',
        title: 'Require All fields'
      })
      
    }
    try {
      setIsSubmitted(true);
      await registerProfile(data.profilePicture, data.lastName, data.firstName, data.middleName, data.contact, data.sex, data.status, data.track, data.rank, data.college, data.department);
    } finally {
      setIsSubmitted(false)
    }
  }

  return (
    <div className='flex justify-center' >
      <form onSubmit={RegisterUserInfo} autoComplete='off' className="w-full px-24 py-8 space-y-4">
        <div className="flex flex-col items-center mb-5">
          <div className="relative">
            <p className='mb-2 text-xl font-medium'>Profile Picture</p>
            <label className='flex items-center justify-center overflow-hidden bg-gray-200 border-2 rounded-full cursor-pointer h-36 w-36'>
              <input type='file' className='hidden' accept="image/*" onChange={(e) => setData({ ...data, profilePicture: e.target.files[0]})}/>
              {data.profilePicture ? (
                <img src={URL.createObjectURL(data.profilePicture)} alt='Profile Picture' className='object-cover w-full h-full' />
              ) : (
                <img src={Default} alt='Profile Picture' className='object-cover w-full h-full'/>             
              )}
              <IoIosAddCircle size={'3.5rem'} className='absolute p-0.5 rounded-full bg-white right-0 top-32 text-gray-500 hover:text-NuButtonHover'/>
            </label>
          </div>
        </div>

        <h1 className='text-[#35408E] font-Poppins font-semibold text-2xl'>Personal Information</h1>

        <div className='space-y-2'>
          <div className="flex w-full space-x-14 max-lg:flex-col max-lg:space-x-0">
            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id='firstName' 
                name='firstName' 
                maxLength='50'
                className={ `border-2 px-3 py-3 rounded-md text-sm ${isSubmitted && !data.firstName.trim() ? 'border-red-400' : 'border-BorderColor'}` }
                onChange={ (e) => setData({ ...data, firstName: e.target.value}) }
              />
              {isSubmitted && !data.firstName.trim() && (
                <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>

            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id='lastName' 
                name='lastName'
                maxLength='50' 
                className={`border-2 px-3 py-3 rounded-md text-sm ${isSubmitted && !data.lastName.trim() ? 'border-red-400' : 'border-BorderColor'}`}
                onChange={(e) => setData({ ...data, lastName: e.target.value})}
              />
              {isSubmitted && !data.lastName.trim() && (
                <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>
          </div>

          <div className="flex space-x-14 max-lg:flex-col max-lg:space-x-0">
            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="middleInitial">Middle Name</label>
              <input 
                type="text" 
                id='middleInitial' 
                name='middleInitial' 
                maxLength='50'
                placeholder='Optional'
                className='w-full px-3 py-3 text-sm border-2 rounded-md border-BorderColor'
                onChange={(e) => setData({ ...data, middleName: e.target.value})}
              />
            </div>

            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="contact">Contact No.</label>
              <input 
                type="text" 
                id='contact' 
                name='contact'  
                maxLength="11"
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.contact.trim() ? 'border-red-400' : 'border-BorderColor'}`}
                onChange={(e) => setData({ ...data, contact: e.target.value})}
              />
              {isSubmitted && !data.contact.trim() && (
                  <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>
          </div>

          <div className="flex space-x-14 max-lg:flex-col max-lg:space-x-0">
            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="sex">Sex</label>
              <select 
                id='sex' 
                name='sex'
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.sex.trim() ? 'border-red-400' : 'border-BorderColor'}`} 
                onChange={(e) => setData({ ...data, sex: e.target.value})}
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {isSubmitted && !data.sex.trim() && (
                  <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>

            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="position">Status</label>
              <select 
                id='position' 
                name='position'
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.status.trim() ? 'border-red-400' : 'border-BorderColor'}`}
                onChange={(e) => setData({...data, status: e.target.value})}
              >
                <option value=""></option>
                <option value="Fulltime">Fulltime</option>
                <option value="Part-time">Part-time</option>
                <option value="Probation">Probation</option>
              </select>
              {isSubmitted && !data.status.trim() && (
                  <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>
          </div>

          <div className="flex space-x-14 max-lg:flex-col max-lg:space-x-0">
            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="track">Track</label>
              <select 
                id='track'
                name='track'
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.track.trim() ? 'border-red-400' : 'border-BorderColor'}`} 
                onChange={(e) => setData({ ...data, track: e.target.value})}
              >
                <option value="">Select a track</option>
                {trackOptions?.map(track => (
                  <option key={track} value={track}>{track}</option>
                ))}
              </select>
              {isSubmitted && !data.track.trim() && (
                  <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>

            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="currentRank">Current Rank</label>
              <select 
                id='currentRank'
                name='currentRank'
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.rank.trim() ? 'border-red-400' : 'border-BorderColor'}`}
                onChange={(e) => setData({ ...data, rank: e.target.value})}
              >
                <option value='None'>None</option>
                {filteredRank?.map(rank => (
                  <option key={rank._id} value={rank.rankName}>{rank.rankName}</option>
                ))}
              </select>
              {isSubmitted && !data.rank.trim() && (
                  <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>
          </div>

          <div className="flex space-x-14 max-lg:flex-col max-lg:space-x-0">
            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="department">College</label>
              <select 
                id='college' 
                name='college'
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.college.trim() ? 'border-red-400' : 'border-BorderColor'}`}
                onChange={(e) => setData({...data, college: e.target.value})}
              >
                <option value=''></option>
                {collegeChoices.map(college => (
                  <option key={college} value={college}>{college}</option>
                ))}
              </select>
              {isSubmitted && !data.college.trim() && (
                <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>

            <div className="relative flex flex-col flex-1 space-y-1">
              <label htmlFor="college">Department</label>
              <select 
                id='department' 
                name='department'
                className={`border-2 px-3 py-3 rounded-md w-full text-sm ${isSubmitted && !data.department.trim() ? 'border-red-400' : 'border-BorderColor'}`}
                onChange={(e) => setData({...data, department: e.target.value})}
              >
                {filterDepartment.map(department => (
                  <option key={department.department} value={department.department}>{department.department}</option>
                ))}
              </select>
              {isSubmitted && !data.department.trim() && (
                <span className="absolute right-[-25px] top-9"><MdError size={'1.3rem'} className='text-red-400'/></span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end max-sm:justify-normal">
          <button type='submit' className='font-medium cursor-pointer text-white bg-[#41518d] py-2 px-14 duration-300 hover:bg-NuButtonHover rounded-md max-lg:w-full' disabled={isSubmitted} >
            <span className='my-auto'>Submit</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProfileRegistrationForm
