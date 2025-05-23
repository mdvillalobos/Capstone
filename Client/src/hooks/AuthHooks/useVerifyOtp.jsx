import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useToast from '../Helpers/useToast.jsx';

const useVerifyOtp = () => {
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();
    const VerifyUserOtp = async (otp) => {
        if(!otp || otp.length < 6) {
            return  Toast.fire({
                icon: "error",
                title: 'Required all fields'
            });
        }

        LoadingToast.fire({
            title: 'Verifying OTP...'
        });
        try {
            const { data } = await axios.post('/api/verifyEmail' , {
                otp,
            });
        
            if(data.error) {
                return Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }
            else {
                LoadingToast.close();
                return navigate('/resetpassword');
            }
        } catch (error) {
            console.error(`OTP Verification Error: ${ error.message }`);
        }
    }
    return { VerifyUserOtp }
}

export default useVerifyOtp
