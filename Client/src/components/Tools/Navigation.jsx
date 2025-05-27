import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from "../../../context/userContext.jsx";
import useLogout from '../../hooks/AuthHooks/useLogout.jsx';
import NuLogo from '../../assets/images/logo.png'

import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RiUserSettingsLine } from "react-icons/ri";
import { HiOutlineCog } from "react-icons/hi";
import { PiStackBold, PiTrashSimpleBold, PiRanking } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { LuLogOut, LuFileBadge } from 'react-icons/lu';

const header = () => {
  const { user } = useContext(UserContext);
  const { Logout } = useLogout();
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path)

  const handleLogout = async () => {
    await Logout(); 
  }
  const home = (user.role === 'user') ? '/dashboard' : (user.role === 'admin') && '/admin/dashboard';

  return (
    <div className='sticky top-0 flex flex-col justify-between w-56 h-screen pt-5 pb-4 text-TextPrimary'>
      <div className="flex flex-col w-full">
        <Link to={home} className="flex mx-auto">
          <img src={NuLogo} alt="Nu Logo" className='w-48' fetchPriority="high"/>
        </Link>

        {user.role === 'user' ? (
          <nav className='mx-4 my-6'>
            <ul className='my-2 space-y-1'>
              <Link to="/dashboard" className={`navigation ${isActive("/dashboard") ? "activeNav" : "notActiveNav"}`}>
                <RxDashboard className='my-auto mr-3 text-lg '/>
                Dashboard
              </Link>

              <Link to="/trash" className={`navigation ${isActive("/trash") ? "activeNav" : "notActiveNav"}`}>
                <PiTrashSimpleBold  className='my-auto mr-3 text-lg'/>
                Recycle Bin
              </Link>

              <Link to="/application" className={`navigation ${isActive("/application") ? "activeNav" : "notActiveNav"}`}>
                <PiStackBold className='my-auto mr-3 text-lg'/>
                Application
              </Link>   

              <Link to="/settings" className={`navigation ${isActive("/settings") ? "activeNav" : "notActiveNav"}`}>
                <HiOutlineCog  className='mr-3 text-lg'/>
                Settings
              </Link>

            </ul>
          </nav>
        ) : (
          <nav className='mx-3 mt-6'>
            <ul className='my-2 space-y-[3px]'>
              <Link to="/admin/dashboard" className={`navigation ${isActive("/admin/dashboard") ? "activeNav" : "notActiveNav"}`}>
                <TbLayoutDashboardFilled className='my-auto mr-3 text-lg'/>
                Dashboard
              </Link>

              <Link to="/admin/application" className={`navigation ${isActive("/admin/application") ? "activeNav" : "notActiveNav"}`}>
                <LuFileBadge className='my-auto mr-3 text-lg'/>
                Applications
              </Link>

              <Link to="/admin/ranks" className={`navigation ${isActive("/admin/ranks") ? "activeNav" : "notActiveNav"}`}>
                <PiRanking className='my-auto mr-3 text-lg'/>
                Ranks
              </Link>

              <Link to='/admin/accountmanagement' className={`navigation ${isActive('/admin/accountmanagement') ? "activeNav" : "notActiveNav"}`}>
                <RiUserSettingsLine className='my-auto mr-3 text-lg'/>
                Manage Accounts
              </Link>

              <Link to='/admin/settings' className={`navigation ${isActive('/admin/settings') ? "activeNav" : "notActiveNav"}`}>
                <HiOutlineCog  className='my-auto mr-3 text-lg'/>
                Settings
              </Link>
            </ul>
          </nav>
        )} 
      </div>

      <div className='mx-4'>
        <button onClick={handleLogout} className='w-full navigation hover:bg-NuLightBlue hover:text-white text-TextSecondary'>
          <LuLogOut className='text-base mr-3 ml-0.5 my-auto'/>
          Logout
        </button>
      </div>
    </div>
  )
}

export default header
