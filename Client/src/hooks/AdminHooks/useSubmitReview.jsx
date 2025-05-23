import axios from 'axios';
import useToast from '../Helpers/useToast';
import { useNavigate } from 'react-router-dom';

const useSubmitReview = () => {
    const { Toast, LoadingToast } = useToast();
    const navigate = useNavigate();

    const submitReview = async (formID, verdict, remarks) => {
        LoadingToast.fire({ title: 'Submitting Review..'})

        try {
            const filterRemarks = remarks.filter(remarksData => remarksData.comment !== '')

            console.log(filterRemarks)


            const { data } = await axios.post('/api/reviewApplication', {
                formID, verdict, filterRemarks
            });

            if(data.erro) {
                Toast.fire({
                    icon: 'error',
                    error: data.error
                });
            }
            else {
                Toast.fire({
                    icon: 'success',
                    title: 'Review submitted successfully'
                });
                return navigate('/admin/application');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return { submitReview }
}

export default useSubmitReview
