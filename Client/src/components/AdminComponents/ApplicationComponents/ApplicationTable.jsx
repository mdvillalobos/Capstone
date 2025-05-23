import { useState, useContext }from 'react'
import { RankContext } from '../../../../context/rankContext';
import { useNavigate } from 'react-router-dom';

import { TiArrowLeft, TiArrowRight } from "react-icons/ti";

import MaleProfile from '../../../assets/images/male.png'
import FemaleProfile from '../../../assets/images/female.png'

import NotFound from '../../../assets/images/NotFound.webp';

const ApplicationTable = ({ data }) => {
    const navigate = useNavigate();
    const { ranks } = useContext(RankContext);
    const [ selected, setSelected ] = useState();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ tableCurrentPage, setTableCurrentPage ] = useState(1);

    const rankArray = Array.from(new Set(ranks?.map(rank => rank.rankName)));
    const filterByRank = data?.filter(rank => selected ? rank.applyingFor === selected : true);

    const itemsPerPage = 8;
    const totalPages = Math.ceil(data?.length / itemsPerPage);
    const indexOfLastItem = tableCurrentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const items = filterByRank?.slice(indexOfFirstItem, indexOfLastItem);

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

    const handleViewApplication = (userData) => {
        navigate('/admin/application/view', { state: { data: userData } })
    }

    return (
        <div className='flex flex-col justify-between w-full h-full'>
            <div className='flex flex-col flex-1'>
                <div className='flex py-2 pl-2 text-xs border-b border-gray-200 text-NuLightText'>
                    <p className='w-[30%]'>Name</p>
                    <p className='w-[20%]'>Current Rank</p>
                    <p className='w-[20%]'>Applying For</p>
                    <p className='w-[15%]'>Academic Year</p>
                    <p className='w-[15%]'>Date Submitted</p>
                </div>
                <div className='flex flex-col'>
                    {items?.length !== 0 ? (
                        items.map((app, index) => {
                            const formattedDate = new Date(app.date_submitted).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            });

                            return (
                                <div key={ index } onClick={ () => handleViewApplication(app) } className='flex py-3 pl-2 text-sm duration-200 border-b border-gray-200 cursor-pointer hover:bg-NuBlue hover:text-white'>
                                    <p className='w-[30%]'>{ app.name }</p> 
                                    <p className='w-[20%]'>{ app.currentRank }</p>
                                    <p className='w-[20%]'>{ app.applyingFor }</p>
                                    <p className='w-[15%]'>{ app.academicYear } </p>
                                    <p className='w-[15%]'>{ formattedDate }</p>
                                </div>
                            )
                        })
                    ) : (
                        <div className='flex flex-col items-center justify-center w-full space-y-2 pointer-events-none select-none'>
                            <img src={NotFound} alt="No Data Found" className='h-80 opacity-90'/>
                            <h1 className='flex justify-center text-2xl font-medium text-gray-500'>No Available Data</h1>
                        </div>
                    )}
                </div>
            </div>

            <div className='flex justify-between'>
                <div className='my-auto text-sm'>
                    <p className='text-xs font-medium text-NuLightText'>Showing Items {(tableCurrentPage - 1) * itemsPerPage + 1 } - {Math.min(tableCurrentPage * itemsPerPage, data.length)} of {data.length}</p>
                </div>
                <div className='flex my-auto space-x-4 text-sm text-NuLightText'>
                    <button type='button' onClick={handlePrevPage} className='border-2 border-gray-200 p-1 cursor-pointer rounded-md flex space-x-1.5 px-2 text-lg hover:bg-gray-200 duration-200 '>
                        <TiArrowLeft className='my-auto'/>
                    </button>
                    <p className='flex my-auto space-x-2'>
                        <span className='px-3 py-1 text-center text-black border-2 border-gray-200 rounded-md'>{tableCurrentPage}</span>
                        <span className='my-auto'>/</span>
                        <span className='px-3 py-1 text-center text-black border-2 border-gray-200 rounded-md'>{totalPages}</span>
                    </p>
                    <button type='button' onClick={handleNextPage} className='border-2 border-gray-200 p-1 cursor-pointer rounded-md flex space-x-1.5 px-2 text-lg hover:bg-gray-200 duration-200'>
                        <TiArrowRight className='my-auto'/>
                    </button>
                </div>
            </div>
        
        </div>
    )
}

export default ApplicationTable
