import { useState } from 'react';
import MaleProfile from '../../../assets/images/male.png';
import FemaleProfile from '../../../assets/images/female.png';
import { BiDotsVerticalRounded } from "react-icons/bi";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import useRegisterAdmin from '../../../hooks/AdminHooks/useRegisterAdmin';
import VerifyAdminModal from '../../Tools/VerifyAdminModal.jsx';
import useUpdateUserStatus from '../../../hooks/AdminHooks/useUpdateUserStatus.jsx';

const AccountsTable = ({ rest, refetchAccounts }) => {
    const { updateAccountStatus } = useUpdateUserStatus();
    const [ isVerifyAdminOpen, setIsVerifyAdminOpen ] = useState(false)
    const [ tableCurrentPage, setTableCurrentPage ] = useState(1);
    const [ selected, setSelected ] = useState();
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ isActionOpen, setActionIsOpen ] = useState(null)

    const roles = Array.from(new Set(rest?.map(acc => acc.role)))
    const filterByRole = rest?.filter(acc => selected ? acc.role === selected : true)

    const itemsPerPage = 8;
    const totalPages = Math.ceil(rest?.length / itemsPerPage);
    const indexOfLastItem = tableCurrentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const items = filterByRole?.slice(indexOfFirstItem, indexOfLastItem);
  
    const handleNextPage = () => {
      if (tableCurrentPage < totalPages) {
        setTableCurrentPage(tableCurrentPage + 1);
      }
    };  
  
    const handlePrevPage = () => {
      if (tableCurrentPage > 1) {
        setTableCurrentPage(tableCurrentPage - 1);
      }
    };

    const handleUpdateAccountStatus = async (id, isActive) => {
        const action = isActive ? false : true 
        const result = await updateAccountStatus(id, action);

        console.log(result.success)
        
        if (result.success) refetchAccounts();
    }

    return (
        <div className='flex flex-col w-full'>
            {isVerifyAdminOpen && (
                <VerifyAdminModal
                    setOpenModal = {setIsModalOpen}
                    handleExit = {() => setIsVerifyAdminOpen(false)}
                />
            )}
            {isModalOpen && (
                <AddAccountModal handleExit={() => setIsModalOpen(false)}/>
            )}
            <div className='flex justify-between mb-4'>
                <p className='my-auto text-sm font-medium tracking-widest text-TextSecondary'>ACCOUNTS</p>
                <button 
                    type='button' 
                    onClick={() => setIsVerifyAdminOpen(true)} 
                    className='px-4 py-2 text-xs text-white duration-200 rounded-md cursor-pointer bg-NuBlue hover:shadow-md hover:scale-105'
                >
                    Add admin
                </button>
            </div>
            <div className='flex flex-col justify-between h-full'>
                <div className='flex flex-col w-full'>
                    <div className='flex py-2 text-xs font-medium border-b border-BorderColor'>
                        <p className='w-[25%]'>Account</p>
                        <p className='w-[15%]'>Employee ID</p>
                        <p className='w-[15%]'>Date created</p>
                        <p className='w-[13%]'>Role</p>
                        <p className='w-[15%]'>Account Verified</p>
                        <p className='w-[12%]'>Status</p>
                        <p className='w-[5%]'></p>
                    </div>

                    {items.map((data, index) => (
                        <div key={index} className='flex text-[0.8rem] py-3 border-b border-BorderColor'>
                            <div className='flex space-x-2 w-[25%]'>
                                {data.accountinfo[0]?.sex === 'Male' ? (
                                    <img src={MaleProfile} alt="" className='w-10 h-10 my-auto rounded-md'/>
                                ) : (
                                    <img src={FemaleProfile} alt="" className='my-auto rounded-md h-9 w-9'/>
                                )}
                                <div className='my-auto -space-y-1'>
                                    <p>{data.accountinfo[0]?.firstName} {data.accountinfo[0]?.lastName}</p>
                                    <p className='text-TextSecondary'>{data.email}</p>
                                </div>
                            </div>

                            <p className='w-[15%] my-auto'>{data.employeeID}</p>

                            <p className='w-[15%] my-auto'>May 20, 2023</p>
                            
                            <p className='w-[13%] my-auto capitalize'>{data.role}</p>

                            <div className='flex w-[15%] my-auto'> 
                                <p className={`text-center p-0.5 rounded-3xl px-5 border ${data.isVerified ? 'border-green-600 text-green-600' : 'border-red-600 text-red-600'}`}>
                                    {data.isVerified ? 'Verified' : 'Not Verified'} 
                                </p>
                            </div>

                            <div className='flex w-[12%] my-auto'> 
                                <p className={`text-center p-0.5 rounded-3xl px-5 border ${data.isActive ? 'border-green-600 text-green-600' : 'border-red-600 text-red-600'}`}>
                                    {data.isActive ? 'Active' : 'Not Active'} 
                                </p>
                            </div>
                            <div className=' relative w-[5%] my-auto flex justify-center'>
                                <button 
                                    type='button' 
                                    className='text-lg cursor-pointer'
                                    onClick={() => setActionIsOpen(prev => prev === index ? null : index )}
                                >
                                    <BiDotsVerticalRounded/>
                                </button>

                                {isActionOpen === index && (
                                    <div className='absolute top-2 right-6 bg-white rounded-md shadow-md p-1.5 rounded-md border-2 border-BorderColor'>
                                        <button 
                                            type='button' 
                                            className='cursor-pointer hover:hover:bg-[#ebebeb] p-2 rounded-sm'
                                            onClick={() => { handleUpdateAccountStatus(data._id, data.isActive), setActionIsOpen(null)}}
                                        >
                                            {data.isActive ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className='flex justify-between'>
                    <div className='my-auto text-sm'>
                        <p className='text-xs font-medium text-TextSecondary'>Showing Items {(tableCurrentPage - 1) * itemsPerPage + 1 } - {Math.min(tableCurrentPage * itemsPerPage, filterByRole.length)} of {filterByRole.length}</p>
                    </div>
                    <div className='flex my-auto space-x-4 text-sm text-TextSecondary'>
                        <button type='button' onClick={handlePrevPage} className='border-2 border-BorderColor p-1 cursor-pointer rounded-md flex space-x-1.5 px-2 text-lg hover:bg-gray-200 duration-200 '>
                            <TiArrowLeft className='my-auto'/>
                        </button>
                        <p className='flex my-auto space-x-2'>
                            <span className='px-3 py-1 text-center text-black border-2 rounded-md border-BorderColor'>{tableCurrentPage}</span>
                            <span className='my-auto'>/</span>
                            <span className='px-3 py-1 text-center text-black border-2 rounded-md border-BorderColor'>{totalPages}</span>
                        </p>
                        <button type='button' onClick={handleNextPage} className='border-2 border-BorderColor p-1 cursor-pointer rounded-md flex space-x-1.5 px-2 text-lg hover:bg-gray-200 duration-200'>
                            <TiArrowRight className='my-auto'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountsTable

const AddAccountModal = ({ handleExit}) => {
    const { registerAdmin } = useRegisterAdmin();
    const [ isSubmitted, setIsSubmitted ] = useState(false)
    const [ data, setData ] = useState({
        employeeID: '',
        email: '',
        lastName: '',
        firstName: '',
        middleName: '',
        sex: '',
        contact: '',
        password: '',
    })

    console.log(data)
    
    const handleCreateAdmin = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitted(true)
            await registerAdmin(data.employeeID, data.email, data.lastName, data.firstName, data.middleName, data.sex, data.contact, data.password)
        } finally {
            setIsSubmitted(false)
            setData({ employeeID: '', email: '', lastName: '', firstName: '', middleName: '', sex: '', contact: '', password: ''})
        }
    }
    return (
        <div className='modal'>
            <div className='w-[50%] h-[65vh] bg-white shadow-md rounded-xl max-sm:w-[85%] max-md:w-[70%] max-lg:w-[50%] max-xl:w-[40%] fade- text-sm'>
                <form onSubmit={handleCreateAdmin} className='flex flex-col h-full'>
                    <div className='relative flex justify-between px-6 py-4 border-b border-BorderColor'>
                        <div className='flex space-x-2'>
                            <div className='space-y-0.5'>
                                <p className='text-sm font-medium'>Create Administrator</p>
                                <p className='text-xs text-TextSecondary'>Enter admin details to create a new administrator account.</p>
                            </div>
                        </div>

                        <button type="button" className="absolute right-4 px-2 top-5 rounded-full hover:bg-[#eae7e7] text-lg duration-200 border-2 border-BorderColor cursor-pointer" onClick={handleExit}>
                            &times;
                        </button> 
                    </div>

                    <p className='px-6 py-2 text-base font-medium'>Personal Information</p>
                    <div className='flex flex-col justify-between h-full px-6 py-4'>
                        <div className='space-y-4'>
                            <div className='flex space-x-4'>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Employee ID:</label>
                                    <input 
                                        type="text" 
                                        maxLength='8' 
                                        onChange={(e) => setData({ ...data, employeeID: e.target.value })}
                                        className='w-full px-3 py-3 text-sm border-2 rounded-md border-BorderColor'
                                    />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Email:</label>
                                    <input 
                                        type="text" 
                                        maxLength='50' 
                                        onChange={(e) => setData({ ...data, email: e.target.value })}
                                        className='w-full px-3 py-3 text-sm border-2 rounded-md border-BorderColor'
                                    />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Contact:</label>
                                    <input 
                                        type="text" 
                                        maxLength='11' 
                                        onChange={(e) => setData({ ...data, contact: e.target.value })}
                                        className='w-full px-3 py-3 text-sm border-2 rounded-md border-BorderColor'
                                    />
                                </div>
                            </div>

                            <div className='flex space-x-4'>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Last Name:</label>
                                    <input 
                                        type="text" 
                                        maxLength='50' 
                                        onChange={(e) => setData({ ...data, lastName: e.target.value })}
                                        className='w-full px-3 py-3 text-sm border-2 rounded-md border-BorderColor'
                                    />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">First Name:</label>
                                    <input 
                                        type="text"
                                        maxLength='50' 
                                        onChange={(e) => setData({ ...data, firstName: e.target.value })} 
                                        className='w-full px-3 py-3 text-sm border-2 rounded-md border-BorderColor'
                                    />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Middle Name:</label>
                                    <input 
                                        type="text" 
                                        onChange={(e) => setData({ ...data, middName: e.target.value })}
                                        className='w-full px-3 py-3 text-sm border-2 rounded-md border-BorderColor'
                                    />
                                </div>
                            </div>

                            <div className='flex space-x-4'>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Sex:</label>
                                    <select 
                                        className='w-full px-3 py-3 text-sm border-2 rounded-md border-BorderColor'
                                        onChange={(e) => setData({ ...data, sex: e.target.value })}
                                    >
                                        <option value=""></option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>

                                <div className='flex flex-col w-full'>
                                    <label htmlFor="">Passowrd:</label>
                                    <input 
                                        type="password" 
                                        maxLength='20' 
                                        onChange={(e) => setData({ ...data, password: e.target.value })}
                                        className='w-full px-3 py-3 text-sm border-2 rounded-md border-BorderColor'
                                        disabled={isSubmitted}
                                    />
                                </div>
                            </div> 
                        </div>

                        <div className='flex justify-end'>
                            <input type="submit" value='Create' className='px-8 py-2 text-white duration-200 rounded-md cursor-pointer bg-NuBlue hover:bg-NuLightBlue hover:shadow-md'/>    
                        </div>
                    </div>               
                </form>
            </div>
        </div>
    )
}
