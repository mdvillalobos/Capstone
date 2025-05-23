import { useState } from "react";
import MaleProfile from '../../../assets/images/male.png';
import FemaleProfile from '../../../assets/images/female.png';

const Approvers = ({ approverList }) => {

    return (
        <div className='flex flex-col px-4 py-3 border-2 border-gray-200 rounded-xl'>
            <div className='flex justify-between mb-4'>
                <p className="font-medium">Approvers</p>
                <button type='button' className="px-4 py-1 my-auto text-xs text-white rounded-md cursor-pointer bg-NuBlue">Edit</button>
            </div>

             <div>
                {approverList ? (
                    approverList.map((approver, index) => (
                        <div key={index} className="text-xs">
                            <div className='flex space-x-2 w-[25%]'>
                                {approver.accountinfo[0].profilePicture ? (
                                    <>
                                    </>
                                ) : (
                                    approver.accountinfo[0]?.sex === 'Male' ? (
                                        <img src={MaleProfile} alt="" className='my-auto rounded-md w-9 h-9'/>
                                    ) : (
                                        <img src={FemaleProfile} alt="" className='my-auto rounded-md h-9 w-9'/>
                                    )
                                )}
                                <div className='my-auto -space-y-1'>
                                    <p>{approver.accountinfo[0]?.firstName} {approver.accountinfo[0]?.lastName}</p>
                                    <p className='text-NuLightText'>{approver.email}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    )
}

export default Approvers
