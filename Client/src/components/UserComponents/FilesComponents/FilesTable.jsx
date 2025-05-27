import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { UserContext } from '../../../../context/userContext.jsx'
import useUpdateCredentialStatus from '../../../hooks/UserHooks/useUpdateCredentialStatus.jsx';
import ViewFile from '../../Tools/ViewFile.jsx';
import { TbPdf, TbJpg, TbPng } from "react-icons/tb";
import { TiArrowLeft, TiArrowRight } from "react-icons/ti";
import { HiViewGrid } from "react-icons/hi";
import { PiListBold } from 'react-icons/pi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const FilesTable = ({ location = 'dashboard' }) => {
    const { credentials } = useContext(UserContext);
    const { updateCredential } = useUpdateCredentialStatus();

    const tableRef = useRef(null);
    const filterRef = useRef(null)
 
    const [ layout, setLayout ] = useState('grid');
    const [ isFilterOpen, setIsFilterOpen ] = useState(false);
    const [ selectedFile, setSelectedFile ] = useState([]);
    const [ selectedFilter, setSelectedFilter ] = useState('');
    const [ tableCurrentPage, setTableCurrentPage ] = useState(1)
    const [ isImageshow, setIsImageShow ] = useState({ show: false, filePath: '', fileName: '', date: '' });

    const documentType = useMemo(() => {
        return Array.from(new Set(credentials?.files?.map(file => file.type)))
    }, [credentials]);

    const filterDocument = useMemo(() => {
        if(!credentials?.files) return [];

        const filteredFiles = credentials?.files.filter(file => {
            if(location === 'dashboard') {
                return file.isActive && (!selectedFilter || file.type === selectedFilter)
            }
            return !file.isActive
        })

        return filteredFiles.reverse();

    }, [credentials, selectedFilter, location])

    const itemsPerPage = layout === 'table' ? 10 : (location === 'trash' ? 15 : 12)
    const totalPages = Math.ceil(filterDocument?.length / itemsPerPage);
    const indexOfLastItem = tableCurrentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const items = filterDocument?.slice(indexOfFirstItem, indexOfLastItem);
    
    const handleNextPage = useCallback(() => {
        setTableCurrentPage(prev => Math.min(prev + 1, totalPages))
    }, [totalPages])

    const handlePrevPage = useCallback(() => {
        setTableCurrentPage(prev => Math.max(prev - 1, 1))
    }, [totalPages])

    const handleClickOutside = useCallback((e) => {
        if(!tableRef.current.contains(e.target)) return setSelectedFile([])
        if(!filterRef.current.contains(e.target)) return setIsFilterOpen(false)
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    const handleClick = useCallback((e, filePath) => {
        setSelectedFile(prev =>
            e.ctrlKey || e.metaKey
                ? (prev.includes(filePath) ? prev.filter(file => file !== filePath) : [...prev, filePath])
                : [filePath]
        )
    }, [])

    const handleDoubleClick = useCallback((filePath, fileName, date) => {
        setIsImageShow({ show: true, filePath: filePath, fileName: fileName, date: date })
    }, [])

    const handleUpdateStatus = async (action) => {
        await updateCredential(selectedFile, action)
        setSelectedFile([])
    }

    return (
        <div className="flex flex-col justify-between flex-1">
            {isImageshow.show && (
                <ViewFile
                    handleExit ={() => setIsImageShow({ show: false })}
                    data = { isImageshow }
                />
            )}

            <div ref={tableRef}>
                <div className='flex justify-between mb-3'>  
                    {selectedFile?.length > 0 ? (
                        <div className='flex space-x-3'>
                            {location === 'trash' && (
                                <button  
                                    type='button' 
                                    className='cursor-pointer flex my-auto py-1.5 px-4 space-x-0.5 rounded-md bg-[#39a97a] text-white duration-200 hover:bg-[#4be1a2]' 
                                    onClick={() => handleUpdateStatus('recover')}
                                >
                                    <p className='my-auto text-sm'>Recover</p>
                                </button>
                            )}

                            <button 
                                type='button' className='flex cursor-pointer my-auto py-1.5 px-5 space-x-0.5 rounded-md bg-[#ef676d] text-white duration-200 hover:bg-[#de333b]' 
                                onClick={() => handleUpdateStatus('delete')}
                            >
                                <p className='my-auto text-sm'>
                                    {location === 'trash' ? 'Delete Forever' : 'Delete'}
                                </p>
                            </button>
                        </div>
                    ) : (
                        <p className='my-auto text-sm font-medium tracking-widest text-TextSecondary'>DOCUMENTS</p>
                    )}
                    
                    <div className='flex space-x-4'>
                        <div className='relative w-48 my-auto' ref={filterRef}>
                            <button 
                                onClick={() => setIsFilterOpen(!isFilterOpen)} 
                                className={`cursor-pointer relative border-2 border-BorderColor w-full rounded-md py-1 text-sm overflow-hidden text-ellipsis whitespace-nowrap px-8 ${isFilterOpen && 'border-NuLightBlue'}`}
                            >
                                {selectedFilter ? selectedFilter : 'Category'}
                                {isFilterOpen ? (
                                    <IoIosArrowUp className='absolute right-2 top-2 '/>
                                ) : (
                                    <IoIosArrowDown className='absolute right-2 top-2'/>
                                )}
                            </button>
                    
                            {isFilterOpen ? (
                                <div className='absolute z-10 w-full space-y-1 overflow-auto text-sm bg-white border-2 rounded-md shadow-md border-BorderColor top-9 h-44 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100'>
                                    <button 
                                        onClick={() => { setSelectedFilter(''), setIsFilterOpen(!isFilterOpen) }} 
                                        className='hover:bg-[#ebebeb] cursor-pointer duration-300 w-full py-1.5 px-4'
                                    >
                                        All
                                    </button>
                                    {documentType.map((type, i) => (
                                        <button 
                                            key={i} 
                                            onClick={() => { setSelectedFilter(type), setIsFilterOpen(!isFilterOpen)}} 
                                            className='hover:bg-[#ebebeb] cursor-pointer duration-300 py-1.5 w-full overflow-hidden text-ellipsis whitespace-nowrap px-4 text-sm'
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            ) : null}
                        </div>

                        <div className='bg-[#ebf2fb] py-1 px-1.5 rounded-md space-x-1'>
                            <button 
                                onClick={() => setLayout('grid')}
                                className={`p-1 cursor-pointer rounded-md duration-200 hover:bg-gray-300 ${layout === 'grid' ? 'shadow-md bg-white text-NuBlue pointer-events-none' : 'text-TextSecondary'}`}
                            >
                                <HiViewGrid className='text-lg'/>
                            </button>

                            <button 
                                onClick={() => setLayout('table')}
                                className={`p-1 cursor-pointer rounded-md duration-200 hover:bg-gray-300 ${layout === 'table' ? 'shadow-md bg-white text-NuBlue pointer-events-none' : 'text-TextSecondary'}`}
                            >
                                <PiListBold className='text-lg'/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className=''>
                    {layout === 'table' ? (
                        <div className='flex w-full px-3 mt-5 mb-2 text-sm font-medium text-TextSecondary'>
                            <p className='w-[45%]'>Name</p>
                            <p className='w-[35%]'>Document Type</p>
                            <p className='w-[20%]'>Date Uploaded</p>
                        </div>
                    ) : null }

                    <div className={`${layout === 'grid' ? (location === 'trash' ? 'grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3' : 'grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3') : 'flex flex-col space-y-1'}`}>
                        {items?.map((doc, i) => {
                            const fileName = doc.fileName.replace(/\.[^/.]+$/, "");
                            const fileType = doc.fileName.split('.').pop().toLowerCase();
                            const formattedDate = new Date(doc.date_uploaded).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            });
                            return (
                                <div 
                                    key={i}
                                    type='button'  
                                    className={`border border-BorderColor cursor-pointer ${selectedFile?.includes(doc.filePath) ? 'bg-[#d2dffb] border-[#eaf4fc]' : null} ${layout === 'grid' ? 'px-4 flex flex-col justify-between rounded-xl' : ' rounded-md flex py-2 px-3'}`}
                                    onClick={(e) => handleClick(e, doc.filePath)}
                                    onDoubleClick={() => handleDoubleClick(doc.filePath, fileName, formattedDate)}
                                >
                                    <div className={`${layout === 'grid' ? 'flex justify-between mt-5' : 'my-auto w-[45%]'}`}>
                                        <div className={` flex items-start ${layout === 'table' && 'space-x-2'}`}>
                                            <div className='my-auto'>
                                                {fileType === 'pdf' ? (
                                                    <p className={`rounded-md bg-[#ef676d] ${layout === 'grid' ? 'p-1.5' : 'p-1'}`}><TbPdf className='text-xl text-white'/></p>
                                                ) : fileType === 'png' ?  (
                                                    <p className={`rounded-md bg-[#4764aa] ${layout === 'grid' ? 'p-1.5' : 'p-1'}`}><TbPng className='text-xl text-white'/></p>
                                                ) : (
                                                    <p className={`rounded-md bg-[#4764aa] ${layout === 'grid' ? 'p-1.5' : 'p-1'}`}><TbJpg className='text-xl text-white'/></p>
                                                )}
                                            </div>
                                            {layout === 'table' && (
                                                <p className='my-auto overflow-hidden text-sm font-medium w-72 whitespace-nowrap text-ellipsis'>{fileName}</p>
                                            )}
                                        </div>
                                    </div>

                                    {layout === 'grid' && (
                                        <div className='flex flex-col mt-3 space-y-1.5'>
                                            <p className='overflow-hidden text-sm font-medium whitespace-nowrap text-ellipsis w-44'>{fileName}</p>
                                            <p className='text-xs text-TextSecondary'>{formattedDate}</p>
                                        </div>
                                    ) }

                                    <div className={`text-TextSecondary ${layout === 'grid' ? 'flex space-x-2 mb-4 mt-8 text-xs' : 'w-[35%] my-auto'}`}>
                                        <p className='overflow-hidden text-xs text-TextSecondary w-44 text-ellipsis whitespace-nowrap'>{doc.type}</p>
                                    </div>

                                    {layout ==='table' && (<p className='text-xs text-TextSecondary my-auto w-[20%]'>{formattedDate}</p>)}                                    
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className='flex justify-between '>
                <div className='my-auto text-sm'>
                    <p className='text-xs font-medium text-TextSecondary'>
                        Showing Items {(tableCurrentPage - 1) * itemsPerPage + 1 } - {Math.min(tableCurrentPage * itemsPerPage, filterDocument?.length)} of {filterDocument?.length}
                    </p>
                </div>
                <div className='flex my-auto space-x-4 text-sm text-TextSecondary'>
                    <button 
                        type='button' 
                        onClick={handlePrevPage} 
                        className='border-2 border-BorderColor p-1 cursor-pointer rounded-md flex space-x-1.5 px-2 text-lg hover:bg-gray-200 duration-200 '
                    >
                        <TiArrowLeft className='my-auto'/>
                    </button>
                    <p className='flex my-auto space-x-2'>
                        <span className='px-3 py-1 text-center text-black border-2 rounded-md border-BorderColor'>{tableCurrentPage}</span>
                        <span className='my-auto'>/</span>
                        <span className='px-3 py-1 text-center text-black border-2 rounded-md border-BorderColor'>{totalPages}</span>
                    </p>
                    <button 
                        type='button' 
                        onClick={handleNextPage} 
                        className='border-2 border-BorderColor p-1 cursor-pointer rounded-md flex space-x-1.5 px-2 text-lg hover:bg-gray-200 duration-200'
                    >
                        <TiArrowRight className='my-auto'/>
                    </button>
                </div>
            </div>


        </div>
    )
}

export default FilesTable