import axios from "axios";
import useToast from "../Helpers/useToast";

const useSubmitApplication = () => {
    const { Toast, LoadingToast } = useToast();

    const SubmitForm = async(name, college, department, currentRank, status, academicYear, ApplyingFor, userTrack, requirements) => {
        LoadingToast.fire({ 
            title: 'Submitting your application.'
        })
        try {
            const { data } = await axios.post('/api/submitEntry', {
                name, college, department, currentRank, status, academicYear, ApplyingFor, userTrack, requirements,
            });

            if(data.error) {
                return Toast.fire({
                    icon: "error",
                    title: data.error
                });
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
        }
    } 
    return { SubmitForm }
}

export default useSubmitApplication
