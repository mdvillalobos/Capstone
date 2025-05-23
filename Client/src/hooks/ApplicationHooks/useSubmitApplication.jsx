import axios from "axios";
import useToast from "../Helpers/useToast";
import { useNavigate } from "react-router-dom";

const useSubmitApplication = () => {
    const { Toast, LoadingToast } = useToast();

    const SubmitForm = async(name, college, department, currentRank, status, academicYear, ApplyingFor, userTrack, requirements, setIsSubmitted) => {
        LoadingToast.fire({ 
            title: 'Submitting your application.'
        })
        try {
            const { data } = await axios.post('/api/submitEntry', {
                name, college, department, currentRank, status, academicYear, ApplyingFor, userTrack, requirements,
            });

            if(data.error) {
                Toast.fire({
                    icon: "error",
                    title: data.error
                });
                return setIsSubmitted(false)
            }
            else {
                Toast.fire({
                    icon: 'success',
                    title: 'Application Submitted.'
                });
                location.reload();
            }
        }
        catch(error) {
            console.error(`Error response: ${error.message}`);
            LoadingToast.close();
            setIsSubmitted(false)
        }
    } 
    return { SubmitForm }
}

export default useSubmitApplication
