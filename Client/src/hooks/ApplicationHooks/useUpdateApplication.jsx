import axios from "axios"
import useToast from '../Helpers/useToast';

const useUpdateApplication = () => {
    const { Toast, LoadingToast } = useToast();

    const updateApplication = async (applicationID, requirements) => {
        LoadingToast.fire({ title: 'Updating application..'});

        try {
            const { data } = await axios.post('/api/updateApplication', {
                applicationID, requirements
            })

            if(data.error) {
                Toast.fire({
                    icon: 'error',
                    title: data.error
                })

                return { success: false }
            }
            else {
                Toast.fire({
                    icon: 'success',
                    title: 'Application updated successfully!'
                })
                return { success: true, updatedData: data.data }
            }
        } catch (error) {
            console.error(`Client Error Updating Requirement: ${error.message}`)
        }

    }

    return { updateApplication }
}

export default useUpdateApplication