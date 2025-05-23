import { useContext, useState } from 'react';
import { UserContext } from '../../../context/userContext.jsx';
import MyProfile from './MyProfile.jsx';
import Securty from './Security.jsx';

const SettingPageHolder = () => {
  const [ isNameOpen, setIsNameOpen ] = useState(false);
  const [ isPasswordOpen, setIsPassword ] = useState(false);
  const [ selected, setSelected ] = useState('Profile');

  return (
    <div className='w-full'>
      <div className="flex space-x-4 border-b-2 border-gray-200">
        <button className={`py-2 font-medium px-2 text-sm cursor-pointer ${selected === 'Profile' ? 'border-b-2 border-b-NuBlue text-NuBlue text-NuButton' : 'text-gray-600'}`} onClick={() => setSelected('Profile')}>My Profile</button>
        <button className={`py-2 font-medium px-2 text-sm cursor-pointer ${selected === 'Security' ? 'border-b-2 border-b-NuBlue text-NuBlue text-NuButton' : 'text-gray-600'}`} onClick={() => setSelected('Security')}>Security</button>
      </div>

      <div className="">
        {selected === 'Profile' ? 
          <MyProfile toggle={() => setIsNameOpen(!isNameOpen)}/> 
        : selected === 'Security' ? 
          <Securty toggle={() => setIsPassword(!isPasswordOpen)}/>
        : null}
      </div>
    </div>
    
  )
}

export default SettingPageHolder
