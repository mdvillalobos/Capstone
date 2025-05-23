import { useContext, useState, useEffect } from 'react'
import FormHeader from '../../components/AuthComponents/FormHeader.jsx';
import FormFooter from '../../components/AuthComponents/FormFooter.jsx';
import ProfileRegistrationForm from '../../components/AuthComponents/ProfileRegistrationForm.jsx';
import { RankContext } from '../../../context/rankContext.jsx';
import { UserContext } from '../../../context/userContext.jsx';
import { useNavigate } from 'react-router-dom';

const ProfileRegistration = () => {
    const { fetchApplicationConfigOnLogin } = useContext(RankContext)
    const { user } = useContext(UserContext);
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchRank = async () => {
            await fetchApplicationConfigOnLogin();
            setLoading(false);
        };
        fetchRank();
    }, [fetchApplicationConfigOnLogin]);

    useEffect(() => {
        if (loading) return; // Wait for loading to finish

        if (user === undefined) return; // Wait for user to be defined

        if (user === null || user?.role === undefined) {
            navigate('/');
        } else if (user?.isVerified === false) {
            navigate('/emailverification')
        } else if (user?.firstName && user?.role === 'admin') {
            navigate('/admin/home');
        } else if (user?.firstName && user?.role === 'user') {
            navigate('/home');
        }
    }, [loading, user, navigate]);


    if(loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
               <div className="cssloader">
                    <div className="triangle1"></div>
                    <div className="triangle2"></div>
                    <p className="text">Please Wait</p>
                </div>
            </div>
        )
    }
    /* if(user !== 'No data' && role === null || user !== 'No data' && role !== null) {
        return user === null ? <Navigate to='/'/> : role === 'user' ? <Navigate to='/home'/> : role === 'admin' && <Navigate to ='/admin/home'/>
    } */
    
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
