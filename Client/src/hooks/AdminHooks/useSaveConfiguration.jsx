import axios from 'axios'
import useToast from '../Helpers/useToast.jsx'
import { useContext } from 'react';
import { RankContext } from '../../../context/rankContext.jsx';

const useSaveConfiguration = () => {
    const { Toast, LoadingToast } = useToast();
    const { setConfig } = useContext(RankContext)

    const saveConfiguration = async (id, academicYear, reRankingStatus) => {
        LoadingToast.fire({ title: 'Updating Configuration....'})

        try {
            const { data } = await axios.post('/api/updateConfig', {
                id, academicYear, reRankingStatus
            });

            if(data.error) {
                return Toast.fire({
                    icon: "error",
                    title: data.error
                });
            }

            else {
                setConfig(data.config);
                LoadingToast.close();
            }

        } catch (error) {
            console.error(`Create Rank Error: ${ error.message }`);
        }
    }
    return { saveConfiguration }
}

export default useSaveConfiguration