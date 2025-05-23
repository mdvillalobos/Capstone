import axios from 'axios';
import useToast from "../Helpers/useToast.jsx";
import useLogout from '../AuthHooks/useLogout.jsx';

const useChangePassword = () => {
    const { Toast, LoadingToast } = useToast();

    const ChangePassword = async (newPassword, confirmNewPassword, setUserIsVerified) => {

        console.log(newPassword, confirmNewPassword)
        if(!newPassword || !confirmNewPassword) {
            return Toast.fire({
                icon: "error",
                title: 'Required all the fields'
            });
        }

        if(newPassword !== confirmNewPassword) {
            return Toast.fire({
                icon: "error",
                title: "Password don't matched!"
            });
        }

        LoadingToast.fire({
            title: 'Updating your password...'
        })

        try {
            const { data } = await axios.post('/api/changepassword', {
                newPassword, confirmNewPassword
            })
      
            if(data.error){
                return Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }

            else {
                Toast.fire({
                    icon: "success",
                    title: 'Password updated succesfully!'
                });
                return setUserIsVerified(false);
            }

        } catch (error) {
            console.error(`Change Password Error: ${ error.message }`);
        }
    }
    return { ChangePassword }
}

export default useChangePassword
