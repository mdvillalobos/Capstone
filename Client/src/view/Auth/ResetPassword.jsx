import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import ResetPasswordForm from '../../components/AuthComponents/ResetPasswordForm.jsx';

const ResetPassword = () => {
    return (
        <div className="bg-[#f4f7f9 font-Poppins ]">
            <BackgroundHead/>
                <div className="form">
                    <div className="formContainer">
                    <h1 className="form-title">Reset Password</h1>
                    <p className='mb-4 text-center text-[.9rem] text-gray-500 max-[396px]:text-[0.8rem]'>Enter your new password for your account.</p>
                    <ResetPasswordForm/>
                    </div>
                </div>
            <BackgroundFoot/>
        </div>
    )
}

export default ResetPassword
