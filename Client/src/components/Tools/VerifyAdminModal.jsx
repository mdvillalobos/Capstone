import { useState } from "react"
import { LuEye, LuEyeOff  } from "react-icons/lu";
import useVerifyAdmin from "../../hooks/AdminHooks/useVerifyAdmin";
import IconButton from '@mui/material/IconButton';

const VerifyAdminModal = ({ setOpenModal, handleExit }) => {
    const { verifyAdmin } = useVerifyAdmin();
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ password, setPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false)

    const handleVerifyAdmin = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitted(true)
            const isPasswordCorrect = await verifyAdmin(password);
            
            if(isPasswordCorrect) {
                setOpenModal(true)
                return;
            }

            return;
        }
        finally {
            setIsSubmitted(false)
        }
    }

    return (
        <div className="modal">
            <div className="flex flex-col w-[30%] bg-white shadow-md rounded-xl fade-in'">
                <div className='relative flex justify-between w-full px-6 py-4 border-b border-BorderColor'>
                    <div className='flex space-x-2'>
                        <div className='space-y-0.5'>
                            <p className='text-base font-medium'>Verification</p>
                            <p className='text-xs text-TextSecondary'>Kindly enter your password to continue.</p>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        onClick={handleExit}
                        className="absolute right-4 px-2 top-5 rounded-full hover:bg-[#eae7e7] text-lg duration-200 border-2 border-gray-200 cursor-pointer" 
                    >
                        &times;
                    </button> 
                </div>

                <form onSubmit={handleVerifyAdmin} className="px-5 pb-4 space-y-8">
                    <div className="auth-input-container border-BorderColor">
                        <input 
                            type={showPassword ? 'text' : 'password'}
                            className="auth-input-field"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />  

                        <IconButton onClick={() => setShowPassword((show) => !show)} edge="end">
                            {showPassword ? <LuEyeOff size="20px" /> : <LuEye size="20px" />}
                        </IconButton>
                    </div>
                    
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button" 
                            onClick={handleExit}
                            className="w-32 px-10 py-2 text-sm text-black duration-200 bg-gray-300 rounded-lg cursor-pointer hover:shadow-md"
                        >
                            Cancel
                        </button>

                        <input 
                            type="submit" 
                            value='Submit' 
                            className="w-32 px-10 py-2 text-sm text-white duration-200 rounded-lg cursor-pointer hover:shadow-md bg-NuBlue"
                            disabled={isSubmitted}
                        />
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default VerifyAdminModal
