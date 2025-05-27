import axios from "axios"
import useToast from "../Helpers/useToast"

const useUpdateUserStatus = () => {
    const { Toast, LoadingToast } = useToast();
    
    const updateAccountStatus = async (id, action) => {
        if(!id) {
            return Toast.fire({
                icon: 'error',
                title: 'Missing account ID!'
            })
        }

        LoadingToast.fire({ title: 'Updating account status...'});

        try {
            const { data } = await axios.post('/api/updateAccount', { id, action })

            if(data.error) {
                Toast.fire({
                    icon: 'error',
                    title: data.error
                })
                return { success: true };
            }

            else {
                Toast.fire({
                    icon: 'success',
                    title: 'Account updated successfully!'
                })
                return { success: true };
            }
        }

        catch (error) {
            console.error(`Updating user account in fronend error: ${ error.message }`)
        }
    }

    return { updateAccountStatus }

}

export default useUpdateUserStatus
