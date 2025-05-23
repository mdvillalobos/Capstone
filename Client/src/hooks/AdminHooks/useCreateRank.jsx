import axios from 'axios'
import useToast from '../Helpers/useToast.jsx'

const useCreateRank = () => {
    const { Toast, LoadingToast } = useToast();
    const createRank = async (rankName, track, requirements) => {

        if(!rankName || !track || requirements.length < 1) {
            return  Toast.fire({
                icon: 'error',
                title: 'Required all fields!'
            });
        }

        LoadingToast.fire({ title: 'Creating Rank.'})
        try {
            const { data } = await axios.post('/api/createRank', { rankName, track, requirements });

            if(data.error) {
                return Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }

            return LoadingToast.close() 
            
        } catch (error) {
            console.error(`Create Rank Error: ${ error.message }`);
        }
    }
    return { createRank }
}

export default useCreateRank
