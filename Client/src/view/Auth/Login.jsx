import BackgroundHead from "../../components/AuthComponents/FormHeader.jsx";
import BackgroundFoot from "../../components/AuthComponents/FormFooter.jsx";
import LoginForm from "../../components/AuthComponents/LoginForm.jsx";

const Login = () => {
    return (
        <div className="bg-[#f4f7f9] font-Poppins">
            <BackgroundHead/>
                <div className="form">
                    <div className="formContainer">
                        <h1 className="text-center text-[3.3rem] mb-6 font-semibold max-[396px]:text-[2.5rem] max-[396px]:font-semibold">Login</h1>
                        <LoginForm/>
                    </div>
                </div>
            <BackgroundFoot/>
        </div>
    )
}

export default Login;

