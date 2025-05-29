import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LuEye, LuEyeOff  } from "react-icons/lu";
import { PiWarningCircleFill } from "react-icons/pi";
import { LiaIdCard } from "react-icons/lia";
import { HiOutlineMail } from "react-icons/hi";
import { TbLock } from "react-icons/tb";
import IconButton from '@mui/material/IconButton';

import TermsAndCondition from '../Tools/TermsAndCondition';
import PrivacyAndPolicy from '../Tools/PrivacyAndPolicy';
import useRegister from '../../hooks/AuthHooks/useRegister';
import useToast from '../../hooks/Helpers/useToast';

const registrationForm = () => {
    const { Register } = useRegister();
    const { Toast } = useToast();

    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirm, setShowConfirm ] = useState(false);
    
    const [ isHovered, setIsHovered ] = useState(false);
    const [ isTermsOpen, setIsTermsOpen ] = useState(false);
    const [ isPrivacyOpen, setIsPrivacyOpen ] = useState(false)
    const [ isChecked, setIsChecked ] = useState(null)
    const [ isSubmitted, setIsSubmitted ] = useState(false)

    const [ data, setData ] = useState({ 
        employeeID: '', 
        email: '', 
        password: '' ,
        confirm: '',
    });

    const [ validity, setValidity ] = useState({
        id: false,
        email: false,
        password: false,
    });

    const [ shake, setShake ] = useState({
        id: false,
        email: false,
        password: false,
        confirm: false,
        isChecked: false
    });

    const checkId = (id) => /^(?=.{5,})(\d+(-\d+)?)$/.test(id);

    const checkEmail = (email) => /^[a-zA-Z]+@(students\.)?national-u\.edu\.ph$/.test(email);

    const checkPassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@\-_&$!]).{8,}$/.test(password);

    useEffect(() => {
        setValidity({
            id: checkId(data.employeeID), //check if validity.id is true or false
            email: checkEmail(data.email),
            password: checkPassword(data.password),
        });
    }, [data]);

    const triggerShake = (fields) => {
        setShake(fields);
        setTimeout(() => {
            setShake({
                id: false,
                email: false,
                password: false,
                confirm: false,
                isChecked: false,
            });
        }, 500);
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        const allFilled = data.employeeID && data.email && data.password && data.confirm && isChecked;
        if (!allFilled) {
            triggerShake({
                id: !validity.id,
                email: !validity.email,
                password: !validity.password,
                confirm: !data.confirm,
                isChecked: !isChecked,
            });

            return Toast.fire({ icon: 'error', title: 'Required all fields.' });
        }

        if (!validity.id || !validity.email || !validity.password) {
            triggerShake({
                id: !validity.id, 
                email: !validity.email, 
                password: !validity.password,
            });
            return;
        }

        if (data.password !== data.confirm) {
            triggerShake({ password: true, confirm: true });
            return Toast.fire({ icon: 'error', title: "Passwords don't match!" });
        }

        try {
            setIsSubmitted(true)
            await Register(data.employeeID, data.email, data.password, data.confirm, setIsSubmitted);
        } finally {
            setIsSubmitted(false)
        }
        
    }

    return (
        <div className='font-Poppins'>
            <form onSubmit={handleRegistration} className='auth-container'>
                <div className={`auth-input-container border-BorderColor ${data.employeeID && !validity.id ? 'border-red-400' : 'focus-within:border-[#93adc2]'} ${shake.id ? 'shake' : ''}`}>
                    <LiaIdCard className='my-auto ml-0.5 mr-0.5' size='1.5rem' color='#707074'/>
                    <input 
                        type="text"
                        maxLength='8'
                        placeholder='Employee ID Number' 
                        value={data.employeeID}
                        onChange={(e) => setData({...data, employeeID: e.target.value })}
                        className='auth-input-field'
                    />
                </div>
                {data.employeeID && !validity.id && (
                    <p className="text-[0.7rem] text-red-400 font-medium mx-1 absolute">Invalid employee ID format.</p>
                )}

                <div className={`auth-input-container border-BorderColor ${data.email && !validity.email ? 'border-red-400' : 'focus-within:border-[#93adc2]'} ${shake.email ? 'shake' : ''}`}>
                    <HiOutlineMail className='my-auto ml-1 mr-0.5' size='1.4rem' color='#707074'/>
                    <input 
                        type="text"
                        maxLength='50'
                        placeholder='Work email' 
                        value={data.email}
                        onChange={(e) => setData({...data, email: e.target.value })}
                        className='auth-input-field'
                    />
                </div>
                {data.email &&!validity.email && (
                    <p className="text-[0.7rem] text-red-400 font-medium mx-1 absolute">Invalid email format.</p>
                )}

                <div className={`auth-input-container border-BorderColor relative ${data.password && !validity.password ? 'border-red-400' : 'focus-within:border-[#93adc2]'} ${shake.password ? 'shake' : ''}`}>
                    <TbLock className='my-auto ml-1 mr-1' size='1.6rem' color='#707074'/>
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Password'
                        maxLength='20'
                        value={data.password}
                        onChange={(e) => setData({...data, password: e.target.value })}
                        className='auth-input-field'
                    />
                    <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                        {showPassword ? <LuEyeOff size="20px" /> : <LuEye size="20px" />}
                    </IconButton>
                    
                    {data.password && !validity.password && (
                        <div className="absolute right-[-25px] top-4 z-10" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                            <PiWarningCircleFill className="text-red-400 cursor-pointer" size="1.2rem" />
                            <div className={`${isHovered ? 'visible arrow' : 'hidden'}`} />
                            <p className={`${isHovered ? 'visible absolute right-[-65px] top-[33px] bg-red-400 p-2 text-xs rounded-md w-60 text-white' : 'hidden'}`}>
                                Please enter at least 8 characters with a number, symbol, uppercase and lowercase letter.
                            </p>
                        </div>
                    )}
                </div>
               {/*  {data.password ? (isPasswordValid) ? null : ( 
                    <p className='text-[0.7rem] text-red-400 font-medium mx-1 absolute'>Invalid password format.</p>
                ) : null} */}

                <div className={`auth-input-container relative border-BorderColor focus-within:border-[#93adc2] ${shake.confirm ? 'shake' : ''}`}>
                    <TbLock className='my-auto ml-1 mr-1' size='1.6rem' color='#707074'/>
                    <input 
                        type={showConfirm ? 'text' : 'password'}
                        placeholder='Confirm password'
                        maxLength='20'
                        value={data.confirm}
                        onChange={(e) => setData({...data, confirm: e.target.value })}
                        className='auth-input-field'
                    />
                    <IconButton onClick={() => setShowConfirm((show) => !show)} edge="end">
                        {showConfirm ? <LuEyeOff size="20px" /> : <LuEye size="20px" />}
                    </IconButton>
                </div>

                <div className={`flex w-full text-[0.9rem] mt-4 mx-1 space-x-2 ${shake.isChecked ? 'shake' : ''}`}>
                    <input 
                        type="checkbox" 
                        name='approved' 
                        id="approved" 
                        value='Approved'
                        checked={ isChecked === 'Approved' } 
                        onChange={(e) => setIsChecked(e.target.checked ? e.target.value : '')} 
                        className='scale-105'
                    />
                    <label htmlFor="approved" className="my-auto text-[0.7rem]">
                        I agree to the
                        <button type="button" onClick={() => setIsTermsOpen(true)} className="text-NuButton hover:underline mx-0.5">
                            Terms and Conditions
                        </button>
                        and
                        <button type="button" onClick={() => setIsPrivacyOpen(true)} className="text-NuButton hover:underline mx-0.5">
                            Privacy Policy
                        </button>.
                    </label>
                </div>

                {isTermsOpen && <TermsAndCondition toggle={() => setIsTermsOpen(false)} />}
                {isPrivacyOpen && <PrivacyAndPolicy toggle={() => setIsPrivacyOpen(false)} />}

                <div className="flex flex-col mt-4">
                    <button type='submit' className='formBtn' disabled={isSubmitted} >
                      <span className='my-auto'>Register</span>
                    </button>

                    <span className="flex justify-center mt-4 text-sm max-[396px]:flex-col max-[396px]:text-center max-[396px]:text-[0.8rem] space-x-1.5">
                        <p className='mr-0.5 font-Poppins'>Already have an account?</p>
                        <Link to="/" className="no-underline text-[#41518d] font-medium font-Poppins hover:underline">Login</Link>
                    </span>
                </div>
            </form>
        </div>
    )   
}

export default registrationForm
