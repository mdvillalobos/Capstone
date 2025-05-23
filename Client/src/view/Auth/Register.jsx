import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import RegistrationForm from "../../components/AuthComponents/RegistrationForm.jsx"

const Register = () => {
    return (
        <div className="bg-[#f4f7f9]">
            <BackgroundHead/>
            <div className="form">
                <div className="formContainer">
                <h1 className="font-Poppins text-center text-5xl mb-9 mt-2 font-semibold max-[396px]:text-[2.5rem] max-[396px]:font-semibold">Register</h1>
                    <RegistrationForm/>
                </div>
            </div>
            <BackgroundFoot/>
        </div>
    )
}

export default Register
