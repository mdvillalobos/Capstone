import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import VerifyOtpForm from '../../components/AuthComponents/VerifyOtpForm.jsx'

const VerifyOTP = () => {
    return (
        <div className="bg-[#f4f7f9]"> 
            <BackgroundHead/>
                <div className="form">
                    <div className="formContainer">
                    <h1 className="font-Poppins text-center text-5xl mb-4 font-semibold max-[396px]:text-[2.5rem] max-[396px]:font-semibold">Recovery</h1> 
                    <p className="font-Poppins mb-4 text-center text-[.9rem] text-gray-500 max-[396px]:text-[.76rem]">Enter the 6-digit OTP that sent to your Email.</p>
                    <div>
                        <VerifyOtpForm/>
                    </div>
                    </div>
                </div>
            <BackgroundFoot/>
        </div>
    )
}

export default VerifyOTP
