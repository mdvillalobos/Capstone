import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import useFindEmail from '../../hooks/AuthHooks/useFindEmail';
import useToast from '../../hooks/Helpers/useToast';

const ForgotPasswordForm = () => {
    const { findEmail } = useFindEmail();
    const { Toast } = useToast();
    const [ isEmailValid, setIsEmailValid ] = useState(true);
    const [ isSubmitted, setIsSubmitted ] = useState(false); 
    const [ data, setData ] = useState({ email: ''});

    const [ shake, setShake ] = useState(false);

    const checkEmail = (email) => /^[a-zA-Z0-9]+@((students\.)?national-u\.edu\.ph|gmail\.com)$/.test(email);

    console.log(isEmailValid)

    useEffect(() => {
        setIsEmailValid(checkEmail(data.email))
    })

    const handleFindEmail = async (e) => {
        e.preventDefault();
        if(!data.email) {
            setShake(true);
            setTimeout(() => {-
                setShake(false);
            }, 500);

            return Toast.fire({
                icon: "error",
                title: 'Required all fields.'
            });
        }

        if(!isEmailValid) {
            setShake(true),
            setTimeout(() => {
                setShake(false);
            }, 500);
            return;
        }

        try {
            setIsSubmitted(true)
            await findEmail(data.email);

        } finally {
            setIsSubmitted(false)
        }
    }

    return (
        <div>
            <form onSubmit={ handleFindEmail } className='auth-container'>
                <div className={`auth-input-container border-BorderColor ${data.email && !isEmailValid ? 'border-red-400' : 'focus-within:border-[#93adc2]'} ${shake ? 'shake' : ''}`}>
                    <HiOutlineMail  className='my-auto ml-1 mr-0.5' size='1.4rem' color='#707074'/>
                    <input 
                        type="text"
                        maxLength='50'
                        placeholder='Work email' 
                        value={ data.email }
                        onChange={(e) => setData({ ...data, email : e.target.value})}
                        className='auth-input-field'
                    />
                </div>
                {data.email && !isEmailValid && ( 
                    <p className='text-[0.7rem] text-red-400 font-medium mx-1 absolute'>Invalid email format.</p>
                )}

                <div className="flex flex-col mt-6">
                    <input type="submit" value='Submit' className='w-full formBtn' disabled={isSubmitted} />
                    <Link to="/" className="flex justify-center mt-4 text-sm max-[396px]:flex-col max-[396px]:text-center max-[396px]:text-[0.8rem] no-underline hover:underline font-Poppins"> 
                        <IoMdArrowRoundBack className='mr-1 relative top-[2.5px]'/> 
                        Back to login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordForm
