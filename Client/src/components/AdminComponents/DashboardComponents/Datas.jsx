import { FiUsers } from "react-icons/fi";
import { ImStack } from "react-icons/im";
import { FaAnglesUp } from "react-icons/fa6";

const Datas = ({ facultyCount, applicationCount, approvedApplications }) => {
 
    return (
        <div className='flex flex-col space-y-3 w-[20%] flex-1'>
            <div className="flex flex-col px-4 py-3 space-y-3 border-2 rounded-xl border-BorderColor">
                <p className='text-xs font-medium text-TextSecondary'>Total Faculty</p>
                <div className="flex space-x-4">
                    <span className="p-2 rounded-full bg-[#f3f3f3]">
                        <FiUsers className='text-base'/>
                    </span>
                    <p className='my-auto text-2xl font-medium text-TextColor'>{facultyCount}</p>
                </div>
            </div>

            <div className="flex flex-col px-4 py-3 space-y-3 border-2 rounded-xl border-BorderColor">
                <p className='text-xs font-medium text-TextSecondary'>Total Applications</p>
                <div className="flex space-x-4">
                    <span className="p-2 rounded-full bg-[#f3f3f3]">
                        <ImStack className='text-base'/>
                    </span>
                    <p className='my-auto text-2xl font-medium text-TextColor'>{applicationCount}</p>
                </div>
            </div>

            <div className="flex flex-col px-4 py-3 space-y-3 border-2 rounded-xl border-BorderColor">
                <p className='text-xs font-medium text-TextSecondary'>Newly Ranked</p>
                <div className="flex space-x-4">
                    <span className="p-2 rounded-full bg-[#f3f3f3]">
                        <FaAnglesUp className='text-base'/>
                    </span>
                    <p className='my-auto text-2xl font-medium text-TextColor'>{approvedApplications.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Datas
