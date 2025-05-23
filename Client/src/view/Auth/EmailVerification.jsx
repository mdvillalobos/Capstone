import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import EmailVerificationForm from '../../components/AuthComponents/EmailVerificationForm.jsx';

const Emailverification = () => {

    return (
        <div className="bg-[#f4f7f9]">
            <BackgroundHead/>
                <div className="form">
                    <div className="formContainer">
                        <h1 className="form-title">Email Verification</h1>
                        <p className="mb-4 font-Poppins text-center text-sm text-gray-500 max-[396px]:text-[0.8rem]">Enter the 6-digit OTP that sent to your Email.</p>
                        <div>
                            <EmailVerificationForm/>
                        </div>
                    </div>
                </div>
            <BackgroundFoot/>
        </div>
    )
}

export default Emailverification
