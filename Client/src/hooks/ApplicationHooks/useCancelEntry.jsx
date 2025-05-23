import axios from "axios";
import useToast from "../Helpers/useToast";

const useCancelApplication = () => {
    const { Toast, LoadingToast } = useToast();

    const cancelEntry = async(id) => {
        LoadingToast.fire({ 
            title: 'Cancelling your application.'
        })

        try {
            console.log(id)
            const { data } = await axios.post('/api/cancelEntry', { id: id})

            if(data.error) {
                Toast.fire({
                    icon: 'error',
                    title: data.error,
                })
            }
            else {
                location.reload();
            }
        }
        catch(error) {
            console.error(`Error response: ${error.message}`);
            LoadingToast.close();
        }
    } 
    return { cancelEntry }
}

export default useCancelApplication
