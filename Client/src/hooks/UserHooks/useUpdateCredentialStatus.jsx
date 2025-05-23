import axios from "axios";
import useToast from "../Helpers/useToast";

const useUpdateCredentialStatus = () => {
    const { Toast, LoadingToast } = useToast();

    const updateCredential = async (selectedFiles, action) => {

        LoadingToast.fire({ title: 'Updating Credential...'})
        try {
            const { data } = await axios.post('/api/updateCredentialStatus',  { selectedFiles, action });

            if(data.error) {
                Toast.fire({
                    icon: 'error',
                    title: data.error
                })
            }

            LoadingToast.close();
            location.reload();
        }
        catch (error) {
            console.error(`Client Error Deleting Credential: ${error.message}`)
        }


    }

    return { updateCredential }
}

export default useUpdateCredentialStatus