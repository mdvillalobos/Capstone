import { PiArrowFatLineUp, PiFiles } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { FaAnglesUp } from "react-icons/fa6";

const Datas = ({ facultyCount, applicationCount, approvedApplications }) => {
 
    return (
        <div className='flex flex-col space-y-3 w-[20%] flex-1'>
            <div className="flex flex-col px-4 py-3 space-y-3 border-2 border-gray-200 rounded-xl">
                <p className='text-xs font-medium text-gray-500'>Total Faculty</p>
                <div className="flex space-x-4">
                    <span className="p-2 rounded-full bg-[#f3f3f3]">
                        <FiUsers className='text-base'/>
                    </span>
                    <p className='my-auto text-2xl font-medium'>{facultyCount}</p>
                </div>
            </div>

            <div className="flex flex-col px-4 py-3 space-y-3 border-2 border-gray-200 rounded-xl">
                <p className='text-xs font-medium text-gray-500'>Total Applications</p>
                <div className="flex space-x-4">
                    <span className="p-2 rounded-full bg-[#f3f3f3]">
                        <ImStack className='text-base'/>
                    </span>
                    <p className='my-auto text-2xl font-medium'>{applicationCount}</p>
                </div>
            </div>

            <div className="flex flex-col px-4 py-3 space-y-3 border-2 border-gray-200 rounded-xl">
                <p className='text-xs font-medium text-gray-500'>Newly Ranked</p>
                <div className="flex space-x-4">
                    <span className="p-2 rounded-full bg-[#f3f3f3]">
                        <FaAnglesUp className='text-base'/>
                    </span>
                    <p className='my-auto text-2xl font-medium'>{approvedApplications.length}</p>
                </div>
            </div>
            
            {/* <div className="flex px-5 py-4 space-x-4 border border-gray-200 rounded-xl">
                <span className="my-auto rounded-full bg-[#f3f3f3] p-3">
                    <ImStack className='text-base'/>
                </span>
                <div className="flex flex-col ">
                    <p className='text-xs font-medium text-gray-500'>Total Applications</p>
                    <p className='text-2xl font-medium'>{applicationCount}</p>
                </div> 
            </div>

            <div className="flex px-5 py-4 space-x-4 border border-gray-200 rounded-xl">
                <span className="my-auto rounded-full bg-[#f3f3f3] p-3">
                    <PiArrowFatLineUp className='text-base'/>
                </span>
                <div className="flex flex-col ">
                    <p className='text-xs font-medium text-gray-500'>Newly Ranked</p>
                    <p className='text-2xl font-medium'>{newlyRankFaculty.length}</p>
                </div> 
            </div> */}
        </div>
    )
}

export default Datas
