import { IoClose } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";

const ConfirmationModal = ({ verdict, handleExit, handleSubmit }) => {
    return (
        <div className='modal'>
            <div className="w-[30%] bg-white rounded-3xl shadow-lg px-8 py-8 fade-in max-sm:w-[85%] max-md:w-[70%] max-lg:w-[50%] max-xl:w-[40%]">
                <div className="space-y-2">
                    <div className="relative">
                        <button 
                            type="button" 
                            className="absolute right-[-20px] top-[-25px] p-2 rounded-full hover:bg-[#eae7e7] text-[#3b3c3c] text-2xl duration-200 cursor-pointer" 
                            onClick={handleExit}
                        >
                            <IoClose/>
                        </button> 
                    </div>
            
                    <div className="flex justify-center">
                        <div className='bg-[#e7edff] p-2.5 rounded-full'>
                            <div className='bg-[#d7dcfe] p-2.5 rounded-full'>
                                <div className='bg-NuBlue p-2.5 rounded-full'>
                                    <BsQuestionLg className='text-xl text-white'/>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    <div className="">
                        <p className='text-3xl font-semibold tracking-tight text-center'>Are you sure?</p>
                         <p className='m-5 text-sm text-center text-gray-600'>Are you sure you want to {verdict} this application?</p>
                    </div>
            
                    <div className="flex space-x-1.5">
                        <button 
                            type='button' 
                            className='w-full py-2 text-sm duration-300 border-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-300 hover:border-gray-300' 
                            onClick={handleExit}
                        >
                            Cancel
                        </button>

                        <button 
                            type='button' 
                            className='w-full py-2 text-sm text-white duration-300 rounded-lg cursor-pointer border-NuBlue bg-NuBlue hover:bg-NuLightBlue' 
                            onClick={handleSubmit}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal