import axios from "axios";
import useToast from "../Helpers/useToast"

const useVerifyAdmin = () => {
    const { Toast, LoadingToast } = useToast();

    const verifyAdmin = async (password) => {
        if(!password) {
            return Toast.fire({
                icon: 'error',
                title: 'Please enter your password!'
            })
        }

        LoadingToast.fire({ title: 'Verifying Admin....'})

        try {
            const { data } = await axios.post('/api/checkAdminPassword', { password })

            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });

                return false
            }

            else {
                Toast.fire({
                    icon: 'success',
                    title: 'Access granted.'
                })

                return(data.data)
            }

        } catch (error) {
            console.error(`Verifying Admin Password on Front-end Error: ${ error.message }`);
        }
    }

    return { verifyAdmin }

}

export default useVerifyAdmin
