import axios from "axios";
import useToast from "../Helpers/useToast";

const useRegisterAdmin = () => {
    const { Toast, LoadingToast } = useToast();

    const registerAdmin = async (employeeID, email, lastName, firstName, middleName, sex, contact, password ) => {

        if(!employeeID || !email || !lastName || !firstName || !sex || !contact || !password ) {
            return Toast.fire({ 
                icon: 'error',
                title: 'Require all fields'
            })
        }

        LoadingToast.fire({ title: 'Registering admin..'})

        try {
            const { data } = await axios.post('/api/registerAdmin', {
                employeeID, email, lastName, firstName, middleName, sex, contact, password
            })

            if(data.error) {
                return Toast.fire({
                    icon: 'error',
                    title: data.error
                })
            }

            else {
                return Toast.fire({
                    icon: 'success',
                    title: 'Account created Succesfully'
                })
            }
        } catch (error) {
            console.log(error)
        }

    }

    return { registerAdmin }

}

export default useRegisterAdmin
