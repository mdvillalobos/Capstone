import axios from "axios"
import useToast from "../Helpers/useToast.jsx";
import { useContext } from "react";
import { UserContext } from "../../../context/userContext.jsx";

const useUpdateName = () => {
  const { Toast, LoadingToast } = useToast();
  const { getProfileOnLogin } = useContext(UserContext);

  const UpdateProfile = async (profile, lastName, firstName, middleName, contact, college, department, status) => {
    LoadingToast.fire({
      title: 'Updating...'
    });

    try {
      const formData = new FormData();
      formData.append('lastName', lastName)
      formData.append('firstName', firstName)
      formData.append('middleName', middleName)
      formData.append('contact', contact)
      formData.append('college', college)
      formData.append('department', department)
      formData.append('status', status)

      if(profile) {
        formData.append('profilePicture', profile)
      }

      const { data } = await axios.post('/api/updateProfile' , formData);
    
      if(data.error) {
        return Toast.fire({
          icon: "error",
          title: data.error
        });
      }

      else {
        getProfileOnLogin();
        return Toast.fire({
          icon: "success",
          title: 'Profile successfully updated!'
        });
      }

    } catch (error) {
      console.error(`Edit Profile Error: ${ error.message }`);
    }
  }
  return { UpdateProfile }
}

export default useUpdateName
