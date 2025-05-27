import { useEffect, useState, useRef } from 'react';
import useVerifyEmail from '../../hooks/AuthHooks/useVerifyEmail';
import useSendOTP from '../../hooks/AuthHooks/useSendOTP';

const EmailVerification = () => {
  const { resendOTP } = useSendOTP();
  const { verifyEmail } = useVerifyEmail();
  const [ resendButton , setResendButton ] = useState(false);
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const [ data, setData ] = useState(Array(6).fill(''));
  const [ timer, setTimer ] = useState(20);
  const inputRefs = useRef([]);

  useEffect(() => {
    if(!resendButton) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendButton(true);
            return 20;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [resendButton]);
  
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value) || value === '') {
      const newOtpData = [...data];
      newOtpData[index] = value;
      setData(newOtpData);

      if (value && index < data.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !data[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    }

    if (e.key === 'ArrowRight' && index < data.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleResendOtp = async () => {
    setResendButton(false);
    resendOTP();
  }

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    const otp = data.join('');
    try {
      setIsSubmitted(true)
      await verifyEmail(otp);
    } finally {
      setIsSubmitted(false)
    }
  }

  return (
    <div>
      <form onSubmit={ handleVerifyEmail } className='auth-container'>
        <div className="flex justify-center gap-3 mb-4">
          {data.map((digit, index) => (
            <input
              key = { index }
              type="text"
              maxLength="1"
              value = { digit }
              ref = { (el) => (inputRefs.current[index] = el) }
              onChange = { (e) => handleChange(e, index) }
              onKeyDown = { (e) => handleKeyDown(e, index) }
              className='border-2 border-BorderColor w-[50px] h-16 text-center font-Poppins font-semibold rounded-md'
            />
          ))}
        </div>
        <input type="submit" value='Verify' className='flex w-full mt-4 formBtn' disabled={isSubmitted} />
      </form>
      <p className='flex justify-center mt-4 text-sm max-[396px]:flex-col max-[396px]:text-center max-[396px]:text-[0.8rem] font-Poppins'>Didn't receive one time pin? 
        <button className='ml-2 text-center text-blue-500 duration-300 hover:underline' onClick={handleResendOtp} disabled={!resendButton}>
          {!resendButton ?  `Resend in ${timer}` : "Resend"}
        </button>
      </p>
    </div>
  )
}

export default EmailVerification
