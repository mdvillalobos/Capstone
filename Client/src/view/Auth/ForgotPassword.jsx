import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import ForgotPassForm from '../../components/AuthComponents/ForgotPasswordForm.jsx'

const ForgotPassword = () => {
    return (
        <div className="bg-[#f4f7f9] font-Poppins">
            <BackgroundHead/>
            <div className="form">
                <div className="formContainer">
                    <h1 className="form-title">Forgot Password</h1>
                    <p className='mt-2 text-center text-[.9rem] text-gray-500'>Provide your account email address.</p>
                    <ForgotPassForm/>
                </div>
            </div>
            <BackgroundFoot/>
        </div>
    )
}

export default ForgotPassword
