import { useState } from 'react'
import { FocusOn } from 'react-focus-on'
import { BiEditAlt } from "react-icons/bi";
import useRegisterAdmin from '../../hooks/AdminHooks/useRegisterAdmin';
import useToast from '../../hooks/Helpers/useToast';

const ManageAccounts = () => {
    const [ isOpen, setIsOpen ] = useState(false);
    return (
        <div className='w-full px-6'>
            <div className='flex justify-between w-full py-4 border-b'>
                <span className="text-left space-y-1.5">
                    <p>Add account</p>
                    <p className='text-sm text-gray-500 max-sm:hidden'>Create an account for an admin.</p>
                </span>
                <button className='flex px-4 py-2 my-auto text-sm text-white duration-300 rounded-lg shadow-md bg-NuButton hover:bg-NuButtonHover hover:shadow-lg hover:scale-105' onClick={() => setIsOpen(!isOpen)}>
                    <span className='max-sm:hidden'>Create</span>
                    <BiEditAlt className='ml-1.5 mt-0.5 max-sm:ml-0 max-sm:mt-0'/>
                </button>
            </div>
            {isOpen ? (<FocusOn><CreateAccount toggle={() => setIsOpen(!isOpen)}/></FocusOn>) : null }
        </div>
    )
}

export default ManageAccounts

const CreateAccount = (props) => {
    const { Toast } = useToast()
    const { RegisterAdmin } = useRegisterAdmin();
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const [ confirm, setConfirm ] = useState(false);
    const [ data, setData ] = useState({
        employeeID: '',
        email: '',
        firstName: '',
        lastName: '',
        middleName: '',
        sex: '',
        contact: '',
        password: '',
        role: 'admin',
        adminPassword: ''
    });

    const checkIfEmpty = async () => {
        if(!data.employeeID || !data.email || !data.firstName || !data.lastName || !data.sex || !data.contact || !data.password || !data.role) {
            return Toast.fire({
                icon: 'error',
                title: 'Require all fields!'
            })
        }

        setConfirm(true)
    }

    const handleRegisterAdmin = async (e) => {
        e.preventDefault();

        setIsSubmitted(false)
        await RegisterAdmin(data.employeeID, data.email, data.firstName, data.lastName, data.middleName, data.sex, data.contact, data.password, data.role, data.adminPassword, setIsSubmitted, props)
    }
    return (
        <div className="fixed top-0 left-0 z-10 flex items-center justify-center w-screen h-screen overflow-auto bg-black/40 font-Poppins">
            <div className={`h-[63%] w-[50%] bg-white shadow-lg px-6 py-2 space-y-5 overflow-y-scroll fade-in max-sm:w-[85%] max-md:w-[70%] max-lg:w-[80%] max-xl:w-[60%] ${ confirm ? 'hidden' : null}`}>
                <div>
                    <div className="relative">
                        <button type="button" className="absolute right-[-20px] top-[-10px] px-2 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c] text-3xl duration-200" onClick={props.toggle}>
                            &times;
                        </button> 

                        <h1 className='my-4 text-2xl font-medium'>Create Account</h1>

                        <div className="flex flex-col space-y-4">
                            <div className='flex space-x-4'>
                                <div className="setting-input-container">
                                    <input type="text"
                                        required
                                        maxLength='10'
                                        value={data.employeeID} 
                                        onChange={(e) => setData({...data, employeeID: e.target.value})}
                                        className='border-2 border-gray-200 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
                                    />
                                    <span className='setting-input-label'>Employee ID</span>
                                </div>

                                <div className="setting-input-container">
                                    <input type="text"
                                        required
                                        maxLength='50'
                                        value={data.email} 
                                        onChange={(e) => setData({...data, email: e.target.value})}
                                        className='border-2 border-gray-200 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
                                    />
                                    <span className='setting-input-label'>Email</span>
                                </div>
                            </div>

                            <div className='flex space-x-4'>
                                <div className="setting-input-container">
                                    <input type="text"
                                        required
                                        maxLength='50'
                                        value={data.lastName} 
                                        onChange={(e) => setData({...data, lastName: e.target.value})}
                                        className='border-2 border-gray-200 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
                                    />
                                    <span className='setting-input-label'>Last Name</span>
                                </div>

                                <div className="setting-input-container">
                                    <input type="text"
                                        maxLength='50'
                                        required
                                        value={data.firstName} 
                                        onChange={(e) => setData({...data, firstName: e.target.value})}
                                        className='border-2 border-gray-200 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
                                    />
                                    <span className='setting-input-label'>First Name</span>
                                </div>
                            </div>

                            <div className='flex space-x-4'>
                                <div className="setting-input-container">
                                    <input type="text"
                                        maxLength='20'
                                        value={data.middleName} 
                                        onChange={(e) => setData({...data, middleName: e.target.value})}
                                        className='border-2 border-gray-200 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
                                    />
                                    <span className='setting-input-label'>Middle Name</span>
                                </div>

                                <div className="setting-input-container">
                                    <select 
                                        required
                                        id='sex' 
                                        name='sex'
                                        className='border-2 border-gray-200 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
                                        onChange={(e) => setData({ ...data, sex: e.target.value})}
                                    >
                                        <option value=""></option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    <span className='setting-input-label'>Sex</span>
                                </div>
                            </div>

                            <div className='flex space-x-4'>
                                <div className="setting-input-container">
                                    <input type="text"
                                        required
                                        maxLength='11'
                                        value={data.contact} 
                                        onChange={(e) => setData({...data, contact: e.target.value})}
                                        className='border-2 border-gray-200 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
                                    />
                                    <span className='setting-input-label'>Contact No.</span>
                                </div>

                                <div className="setting-input-container">
                                    <input type="text"
                                        required
                                        maxLength='16'
                                        value={data.password} 
                                        onChange={(e) => setData({...data, password: e.target.value})}
                                        className='border-2 border-gray-200 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
                                    />
                                    <span className='setting-input-label'>Password</span>
                                </div>
                            </div>

                        </div>
                        <button type="submit" className='w-full py-4 mt-4 text-sm font-semibold text-white duration-300 rounded-lg cursor-pointer bg-NuBlue px-14 hover:bg-NuButtonHover' onClick={checkIfEmpty}>
                            Create
                        </button>
                    </div>
                </div>
            </div>

            {confirm ? (
                <div className="absolute h-[35%] w-[30%] bg-white shadow-lg px-6 py-2 space-y-5 overflow-y-scroll fade-in max-sm:w-[85%] max-md:w-[70%] max-lg:w-[50%] max-xl:w-[40%]">
                    <button type="button" className="absolute right-0 top-2 px-2 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c] text-3xl duration-200" onClick={() => setConfirm(!confirm)}>
                        &times;
                    </button> 

                    <div className="">
                        <h1 className='text-2xl font-medium'>Admin Password</h1>
                        <p className='text-sm text-gray-500'>Please enter your password to continue</p>
                    </div>

                    <div className="setting-input-container">
                        <input type="text"
                            required
                            maxLength='16'
                            value={data.adminPassword} 
                            onChange={(e) => setData({...data, adminPassword: e.target.value})}
                            className='border-2 border-gray-200 rounded-lg px-3 peer pt-7 pb-2 outline-none w-full focus:bg-[#f3f4fd] focus:border-[#c1c6f2]'
                        />
                        <span className='setting-input-label'>Password</span>
                    </div>
                    <button type="submit" disabled={isSubmitted} className='w-full py-4 mt-4 text-sm font-semibold text-white duration-300 rounded-lg cursor-pointer bg-NuBlue px-14 hover:bg-NuButtonHover' onClick={handleRegisterAdmin}>
                            {isSubmitted ? 'Loading...' : "Confirm"} 
                        </button>
                </div>
            ) : null }
        </div>
    )
}


