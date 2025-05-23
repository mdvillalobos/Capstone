import axios from 'axios';
import useToast from '../Helpers/useToast.jsx'

const userVerifyUser = () => {
    const { Toast, LoadingToast } = useToast();

    const VerifyUser = async ( otp, setOtp, setIsVerifyOpen, setUserIsVerified ) => {
        if(!otp) {
            return Toast.fire({
                icon: 'error',
                title: 'Kindle enter yout OTP!'
            });
        }

        LoadingToast.fire({ title: 'Verifying you OTP...'});

        try {
            const { data } = await axios.post('/api/verifyEmail', { otp });
    
            if(data.error) {
                return Toast.fire({
                    icon: 'error',
                    title: data.error,
                });
            }

            else {
                LoadingToast.close();
                setIsVerifyOpen(false)
                setOtp('')
                return setUserIsVerified(true);
            }
        }

        catch (error) {
            console.error(`User Verification Error: ${ error.message }`)
        }
    }
    return { VerifyUser }
}

export default userVerifyUser
