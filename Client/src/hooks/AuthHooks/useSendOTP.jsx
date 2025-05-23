import axios from "axios"
import useToast from "../Helpers/useToast"

function useSendOTP() {
    const { Toast, LoadingToast } = useToast();

    const resendOTP = async () => {
        LoadingToast.fire({
            title: 'Sending your OTP.'
        });

        try {
            const { data } = await axios.post('/api/resendOTP');

            if(data.error) {
                return Toast.fire({
                    icon: 'error',
                    title: data.error
                });
            }
            else {
                return Toast.fire({
                    icon: 'success',
                    title: 'Your OTP Sent Successfully!'
                });
            }
        }
        catch(error) {
            console.error( `Sending One Time Pin Error: ${ error.message }`)
        }
        
    }

    return { resendOTP }

}

export default useSendOTP
