import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail } from "react-icons/hi";
import { TbLock } from "react-icons/tb";
import { LuEye, LuEyeOff  } from "react-icons/lu";
import IconButton from '@mui/material/IconButton';
import useLogin from '../../hooks/AuthHooks/useLogin';
import useToast from '../../hooks/Helpers/useToast';

const LoginForm = () => {
    const { Login } = useLogin();
    const { Toast } = useToast();
    const [ showPassword, setShowPassword ] = useState(false);
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ data, setData ] = useState({ email: '', password: '' });
    const [ shake, setShake ] = useState({ email: false, password: false });

    const triggerShake = (fields) => {
        const newShake = {
            email: !fields.email,
            password: !fields.password,
        };
        setShake(newShake);
        setTimeout(() => setShake({ email: false, password: false }), 500);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if(!data.email || !data.password ) {
            triggerShake(data);

            return Toast.fire({
                icon: "error",
                title: 'Required all fields.'
            });
        }

        try {
            setIsSubmitted(true)
            await Login(data.email, data.password);
        } finally {
            setIsSubmitted(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin} className='auth-container' >
                <div className={`auth-input-container border-BorderColor focus-within:border-[#93adc2] ${shake.email ? 'shake' : ''}`}>
                    <HiOutlineMail className='my-auto ml-1 mr-0.5' size='1.4rem' color='#707074'/>
                    <input 
                        type="text"
                        maxLength='50'
                        placeholder='Work Email' 
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        className='auth-input-field'
                    />
                </div>
   
                <div className={`auth-input-container border-BorderColor focus-within:border-[#93adc2] ${shake.password ? 'shake' : ''}`}>
                    <TbLock className='my-auto ml-1 mr-1' size='1.6rem' color='#707074'/>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        value={data.password}
                        onChange={(e) => setData({ ... data, password: e.target.value })}
                        className='auth-input-field'
                    />
                    <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                        {showPassword ? <LuEyeOff size="20px" /> : <LuEye size="20px" />}
                    </IconButton>
                </div>
        
                <div className="flex flex-col">
                    <Link to="/forgotpassword" className='flex self-end text-sm mt-2 mb-4 text-[#41518d] font-medium hover:underline max-[396px]:text-[0.8rem] max-[396px]:mt-2'>Forgot password?</Link>
                    
                    <button type='submit' className='formBtn' disabled={isSubmitted} >
                        <span className='my-auto'>Login</span>
                    </button>
                    
                    <span className="flex justify-center mt-4 text-sm max-[396px]:flex-col max-[396px]:text-center max-[396px]:text-[0.8rem] space-x-1.5" >
                        <p className='r-2 max-[396px]:mr-0'>Don't have an account?</p> 
                        <Link to="/register" className="no-underline text-[#41518d] font-medium hover:underline">Create an account</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
