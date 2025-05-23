import { useState, useEffect, useRef } from 'react';
import useVerifyOtp from '../../hooks/AuthHooks/useVerifyOtp';
import useSendOTP from '../../hooks/AuthHooks/useSendOTP';

const verifyOtpForm = () => {
  const { resendOTP } = useSendOTP();
  const { VerifyUserOtp } = useVerifyOtp();
  const [ resendButton , setResendButton ] = useState(false);
  const [ isSubmitted, setIsSubmitted ] = useState(false)
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

  const hanldeOtpVerification = async (e) => {
    e.preventDefault();
    const otp = data.join('');
    try {
      setIsSubmitted(true)
      await VerifyUserOtp(otp, setIsSubmitted);
    } finally {
      setIsSubmitted(false)
    }
  }

  return (
    <div>
      <form onSubmit={hanldeOtpVerification} className='auth-container'>    
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
              className='border-2 border-gray-200 w-[50px] h-16 text-center font-Poppins font-semibold rounded-md text-xl'
            />
          ))}
        </div>

        <div className="flex flex-col mt-6">
          <button type='submit' className='formBtn' disabled={isSubmitted} >
            <span className='my-auto'>Verify
            </span>
          </button>
        </div>
      </form>
      <p className='flex justify-center mt-4 text-sm max-[396px]:flex-col max-[396px]:text-center max-[396px]:text-[0.8rem] font-Poppins'>Didn't receive one time pin? 
        <button className='ml-2 text-center text-blue-500 duration-300 cursor-pointer hover:underline' onClick={handleResendOtp} disabled={!resendButton}>
          {!resendButton ?  `Resend in ${timer}` : "Resend"}
        </button>
      </p>
    </div>
  )
}

export default verifyOtpForm