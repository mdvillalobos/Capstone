import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';
import { RankContext } from '../../../context/rankContext.jsx';

const useLogin = () => {
    const { fetchApplicationConfigOnLogin } = useContext(RankContext);
    const { getProfileOnLogin } = useContext(UserContext);
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate()

    const Login = async (email, password) => {
        if(!email || !password) {
            return Toast.fire({
                icon: "error",
                title: 'Required all fields'
            });
        }
        
        LoadingToast.fire({
            title: 'Logging you in...',
        });
        try {
            const { data } = await axios.post('/api/login', {
                email, password
            });
         
            if(data.error) {
                return Toast.fire({
                    icon: "error",
                    title: data.error,
                });
            }
    
            else if(!data.isVerified) {
                navigate('/emailverification')
                LoadingToast.close();
            }

            else if(!data.accountinfo?.[0].firstName) {
                navigate('/profileRegistration')
            }

            else {
                await Promise.all([
                    getProfileOnLogin(),
                    fetchApplicationConfigOnLogin(),
                ]);
                LoadingToast.close();
            }

        } catch (error) {
            console.error(`Login Error: ${ error.message }`);
        }
    }

    return { Login }
}

export default useLogin
