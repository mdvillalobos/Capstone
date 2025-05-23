import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import useToast from '../Helpers/useToast.jsx';

const useLogout = () => {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { Toast } = useToast();
    
    const Logout = async () => {
        try {
            await axios.post('/api/logout')
            setUser(null)
            Toast.fire({ icon: 'success', title: 'Logout Successfully'})
            navigate('/login');

        } catch (error) {
            console.error(`Logout Error ${ error.message }`);
        }
    }
    return { Logout }
}

export default useLogout
