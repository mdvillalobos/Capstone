import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import { LuEye, LuEyeOff  } from "react-icons/lu";
import { PiWarningCircleFill } from "react-icons/pi";
import useResetPassword from '../../hooks/AuthHooks/useResetPassword';
import useToast from '../../hooks/Helpers/useToast';

const ResetPasswordForm = () => {
    const { ResetPassword } = useResetPassword();
    const { Toast } = useToast();
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirm, setShowConfirm ] = useState(false);
    const [ isPasswordValid, setIsPasswordValid ] = useState(false);
    const [ isPasswordHover, setIsPasswordHover ] = useState(false);
    const [ isSubmitted, setIsSubmitted ] = useState(false)
    const [ data, setData ] = useState({ newPassword: '', confirmNewPassword: '' })

    const [ shake, setShake ] = useState({
        newPassword: false,
        newConfirm: false,
    });

    const checkPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@\-_&$]).{8,}$/.test(password);

    const triggerShake = (fields) => {
        const newShake = {
            newPassword: !fields.newPassword,
            newConfirm: !fields.confirmNewPassword,
        };
        setShake(newShake);
        setTimeout(() => setShake({ newPassword: false, newConfirm: false }), 500);
    };

    useEffect(() => {
        setIsPasswordValid(checkPassword(data.newPassword));
    }, [data])

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if(!data.newPassword || !data.confirmNewPassword) {
            triggerShake(data)
            
            return Toast.fire({
                icon: "error",
                title: 'Required all fields'
            });
        }

        if(!isPasswordValid ) {
            setShake({ newPassword: !isPasswordValid}),
            setTimeout(() => {
                setShake({ newPassword: false, newConfirm: false });
            }, 500);
            return;
        }
        try {
            setIsSubmitted(true)
            await ResetPassword(data.newPassword, data.confirmNewPassword)
        } finally {
            setIsSubmitted(false)
        }
    }

    return (
        <div>
            <form onSubmit={handleResetPassword} className='auth-container'>
                <div className={`auth-input-container border-gray-200 relative ${data.newPassword && !isPasswordValid ? 'border-red-400' : 'focus-within:border-[#93adc2]'} ${shake.password ? 'shake' : ''}`}>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        maxLength='20'
                        value={data.newPassword}
                        onChange={(e) => setData({ ...data, newPassword: e.target.value })}
                        className='auth-input-field'
                    />

                    <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                        {showPassword ? <LuEyeOff size="20px" /> : <LuEye size="20px" />}
                    </IconButton>

                    {/* {data.password  (isPasswordValid) ? null : ( 
                        <div className="absolute right-[-25px] top-4 z-10" onMouseEnter={() => setIsHovered({ passwordHover: true })} onMouseLeave={() => setIsHovered({ passwordHover: false})}>
                            <PiWarningCircleFill size={'1.2rem'} className='text-red-400 cursor-pointer'/>
                            <div className={`${isHovered.passwordHover ? 'visible arrow' : 'hidden'}`}></div>
                            <p className={`${isHovered.passwordHover ? 'visible absolute right-[-65px] top-[33px] bg-red-400 p-2 text-xs rounded-md w-60 text-white' : 'hidden'}`}>Please enter at least 8 characters with a number, symbol, uppercase and lowercase letter.</p>
                        </div> 
                    ) : null} */}

                    {!isPasswordValid && data.newPassword && (
                        <div className="absolute right-[-25px] top-4 z-10" onMouseEnter={() => setIsPasswordHover(true)} onMouseLeave={() => setIsPasswordHover(false)}>
                            <PiWarningCircleFill className="text-red-400 cursor-pointer" size="1.2rem" />

                            <div className={`${isPasswordHover ? 'visible arrow' : 'hidden'}`} />

                            <p className={`${isPasswordHover ? 'visible absolute right-[-65px] top-[33px] bg-red-400 p-2 text-xs rounded-md w-60 text-white' : 'hidden'}`}>
                                Please enter at least 8 characters with a number, symbol, uppercase and lowercase letter.
                            </p>
                        </div>
                    )}
                </div>
              
                {data.newPassword && !isPasswordValid && ( 
                    <p className='text-[0.7rem] text-red-400 font-medium mx-1 absolute'>Invalid password format.</p>
                )}

                <div  className={`auth-input-container focus-within:border-[#93adc2] border-gray-200 ${shake.confirm ? 'shake' : ''}`}>
                    <input 
                        type={showConfirm ? 'text' : 'password'}
                        maxLength='20'
                        placeholder='Confirm password'
                        value={data.confirmNewPassword}
                        onChange={(e) => setData({ ...data, confirmNewPassword: e.target.value })}
                        className='auth-input-field'
                    />
                    <IconButton onClick={() => setShowConfirm((show) => !show)} edge="end">
                        {showConfirm ? <LuEyeOff size="20px" /> : <LuEye size="20px" />}
                    </IconButton>
                </div>
                <div className="flex flex-col mt-6">
                    <button type='submit' className='formBtn' disabled={isSubmitted} >
                        <span className='my-auto'>Confirm</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ResetPasswordForm