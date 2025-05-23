import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';

const useRegister = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const { Toast, LoadingToast } = useToast();
    
    const Register = async (employeeID, email, password, confirm) => {
        if(!employeeID || !email || !password) {
            return Toast.fire({
                icon: "error",
                title: 'Required all fields.'
            });
        }

        LoadingToast.fire({
            title: 'Registering your data. Please wait.'
        });
        try {
            const { data } = await axios.post('/api/register', {
                employeeID, email, password, confirm
            });
    
            if(data.error) {
                return Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }
            else {
                LoadingToast.close();
                setUser(data)
            }
        } catch (error) {
            console.error(`Registration Error: ${ error.message }`);
        }
    }
    return { Register }
}

export default useRegister
