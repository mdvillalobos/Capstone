import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/userContext.jsx";
import axios from "axios";

//auth
import Login from './view/Auth/Login.jsx';
import Registration from './view/Auth/Register.jsx';
import ProfileRegistration from './view/Auth/ProfileRegistration.jsx';
import EmailVerification from './view/Auth/EmailVerification.jsx';
import ForgotPassword from './view/Auth/ForgotPassword.jsx';
import VerifyOTP from './view/Auth/VerifyOtp.jsx';
import ResetPassword from './view/Auth/ResetPassword.jsx';

//user
/* import ApplicationForm from './view/User/UserApplication.jsx'; */
import Dashboard from './view/User/Dashboard.jsx';
import Trash from './view/User/Trash.jsx';
import ApplicationForReRanking from './view/User/Application.jsx';
import Setting from './view/User/Settings.jsx';
import UserApplicationForm from "./view/User/UserApplicationForm.jsx";

//admin 
import AdminDashboard from './view/Admin/AdminDashboard.jsx';
import AdminApplication from './view/Admin/AdminApplication.jsx';
import ViewApplication from './view/Admin/ViewApplication.jsx';
import AdminSettings from './view/Admin/Settings.jsx';
import AccountManagement from "./view/Admin/AccountManagement.jsx";
import Ranks from './view/Admin/Ranks.jsx'

//Error page
import ErrorPage from './view/Error/ErrorPage.jsx';
import Restriction from './view/Error/Restriction.jsx';
import InactivityPopup from './view/Error/InactivityPopup.jsx';

//helpers
import useProtectRoutes from './hooks/Helpers/useProtectRoutes.jsx';
import useInactivityLogout from './hooks/Helpers/useInactivityLogout.jsx'

//images 
import { Helmet } from 'react-helmet';
import NotFound from './assets/images/NotFound.webp';
import NoData from './assets/images/NoData.webp';
import NuLogo from './assets/images/NU_shield.webp';
import maleProfile from './assets/images/male.webp';
import femaleProfile from './assets/images/female.webp';
import Done from './assets/images/done.webp'

/* axios.defaults.baseURL = 'http://localhost:3001';  */
axios.defaults.baseURL = 'https://nufso.onrender.com';
axios.defaults.withCredentials = true;

const App = () => {
  const { PageRouteProtection, AuthPageProtection, EmailPageProtection} = useProtectRoutes();
  const { user } = useContext(UserContext)

  const { isPopupVisible, handlePopupConfirm } = useInactivityLogout(600000, user !== null && user?.role !== undefined);
 
  return (
    <>
      <InactivityPopup 
        isVisible={isPopupVisible} 
        onConfirm={handlePopupConfirm} 
      />
     {/*  <Helmet>
        <link rel="preload" href={NotFound} as="image" />
        <link rel="preload" href={Done} as="image" />
        <link rel="preload" href={NoData} as="image" />
        <link rel="preload" href={NuLogo} as="image" />
        <link rel="preload" href={maleProfile} as="image" />
        <link rel="preload" href={femaleProfile} as="image" />
      </Helmet> */}

      <Routes>
        <Route exact path='/profileregistration' element={<ProfileRegistration />} />
        {/* <Route exact path='/emailverification' element={ <EmailVerification/> }/> */}

        <Route element={<EmailPageProtection/>}>
          <Route exact path='/emailverification' element={ <EmailVerification/> }/>
        </Route>
        
        {/* authentication */}
        <Route element={<AuthPageProtection/>}>
          <Route exact path="/" element={ <Login/> }/>
          <Route exact path="/login" element={ <Login/> }/>
          <Route exact path="/register" element={ <Registration/> }/>
          <Route exact path="/registration" element={ <Registration/> }/>
    
          {/* forgot password */}
          <Route exact path='/forgotpassword' element={ <ForgotPassword/> }/>
          <Route exact path='/verifyotp' element={ <VerifyOTP/> }/>
          <Route exact path='/resetpassword' element={ <ResetPassword/> }/>
        </Route>
    
        {/* User */}
        <Route element={<PageRouteProtection providedRole={'user'}/>}>
          <Route exact path="/dashboard" element={ <Dashboard/> }/>
          <Route exact path="/trash" element={ <Trash/> }/>
          <Route exact path="/application" element={ <ApplicationForReRanking /> }/>
          <Route exact path="/settings" element={ <Setting/> }/>
    
          {/* Application forms */}
          {/* <Route exact path='/application/form' element={ <ApplicationForm/> }/> */}
          <Route exact path='/application/myform' element={<UserApplicationForm/>} />
        </Route>
        
        {/* admin */}
        <Route element={<PageRouteProtection providedRole={'admin'}/>}>
          <Route exact path="/admin/" element={ <AdminDashboard/> }/>
          <Route exact path="/admin/dashboard" element={ <AdminDashboard/> }/>
          <Route exact path="/admin/application" element={ <AdminApplication/> }/>
          <Route exact path='/admin/application/view' element={ <ViewApplication/> }/>

          <Route exact path='/admin/settings' element={ <AdminSettings/> } />
          <Route exact path='/admin/accountmanagement' element={ <AccountManagement />}/>
          <Route exact path='/admin/ranks' element={ <Ranks />}/>
        </Route>
    
        {/* Error Page */}
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/restriction'element ={<Restriction/>}/>
      </Routes>
    </>
  )
}

export default App
