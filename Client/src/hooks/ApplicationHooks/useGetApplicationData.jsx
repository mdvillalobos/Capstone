import useToast from '../Helpers/useToast';
import useSubmitApplication from "./useSubmitApplication";

const useGetApplicationData = () => {
    const { Toast } = useToast();
    const { submitForm } = useSubmitApplication();
    const getApplicationData = async (name, college, department, currentRank, status, academicYear, ApplyingFor, userTrack, requirements, setIsSubmitted) => {
        try {
            const maxSizeInBytes = 5 * 1024 * 1024;
            const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
            const userSubmittedFields = [
                requirement_1, 
                requirement_2, 
                requirement_3, 
                requirement_4, 
                requirement_5, 
                requirement_6, 
                requirement_7, 
                requirement_8, 
                requirement_9, 
                requirement_10
            ]

            const formData = new FormData();
            formData.append('name', name);
            formData.append('college', college);
            formData.append('department', department);
            formData.append('currentRank', currentRank);
            formData.append('academicYear', academicYear);
            formData.append('status', status);
            formData.append('ApplyingFor', ApplyingFor);
            formData.append('userTrack', userTrack);
            
            userSubmittedFields.forEach((field, i) => {
                if(field !== null) {
                    if(validTypes.includes(field.type) && field.size <= maxSizeInBytes) {
                        formData.append(`requirement_${i+1}`, field)
                    }
                    else {
                        Toast.fire({
                            icon: 'error',
                            title: `Invalid file type or size: ${field.name}`
                        });
                        return setIsSubmitted(false)
                    }
                   
                }
            })
            await submitForm(formData, setIsSubmitted);

        } catch (error) {
            console.error(`Getting User Application Data Error: ${ error.message }`);
            setIsSubmitted(false)
        }
    }

  return { getApplicationData };
}

export default useGetApplicationData
