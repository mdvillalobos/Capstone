import { useContext, useRef, useState, useEffect, useCallback } from 'react';
import { UserContext } from '../../../../context/userContext';
import { TbPdf, TbPng, TbJpg } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import ViewFile from '../../Tools/ViewFile';

const SearchFile = () => {
    const { credentials } = useContext(UserContext);
    
    const searchRef = useRef(null);
    const [ search, setSearch ] = useState('');
    const [ isSearchOpen, setIsSearchOpen ] = useState(false);
    const [ isImageshow, setIsImageShow ] = useState({ show: false, filePath: '', fileName: '', date: '' });

    const searchDocument = credentials?.files?.filter(file => file.fileName.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(searchRef.current && !searchRef.current.contains(e.target)) {
                setIsSearchOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleViewFile = useCallback((filePath, fileName, date) => {
        setIsImageShow({ show: true, filePath: filePath, fileName: fileName, date: date })
    }, [])

    return (
        <div className='flex relative my-auto w-[25vw]' ref={searchRef} >
            {isImageshow.show && (
                <ViewFile
                    handleExit ={() => setIsImageShow({ show: false })}
                    data = { isImageshow }
                />
            )}
            <div className='relative flex w-full overflow-hidden border-2 border-gray-200 rounded-xl'>
                <input type="text" 
                    className='w-full px-5 py-3 text-xs outline-none'
                    placeholder='Search file here...'
                    onChange={(e) => { setSearch(e.target.value), setIsSearchOpen(true)}} 
                />

                <span className='bg-NuLightBlue absolute right-1 top-1 rounded-xl p-1.5'>
                    <FiSearch className='my-auto text-xl text-white'/>
                </span>
            </div>
            {isSearchOpen && (
                <div className='absolute z-10 w-full space-y-1 overflow-hidden text-sm bg-white border-2 border-gray-200 shadow-xl top-12 rounded-xl'>
                    <div className='scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-h-[50vh] overflow-y-auto'>
                        {searchDocument.length > 0 ? (
                            searchDocument.map((doc, i) => {
                                const fileName = doc.fileName.replace(/\.[^/.]+$/, "");
                                const fileType = doc.fileName.split('.').pop().toLowerCase();
                                const formattedDate = new Date(doc.date_uploaded).toLocaleDateString('en-US', {
                                    month: 'short',
                                    year: 'numeric'
                                });
                                return (
                                    <button 
                                        key={i} 
                                        className='flex justify-between hover:bg-[#ebebeb] duration-300 py-2 cursor-pointer px-3 text-left w-full'
                                        onClick={() => handleViewFile(doc.filePath, fileName, formattedDate)}
                                    >
                                        <div className='flex space-x-2'>
                                            <div className='my-auto'>
                                                {fileType === 'pdf' ? (
                                                    <p className='p-1.5 rounded-md bg-[#ef676d]'><TbPdf className='text-xl text-white'/></p>
                                                ) : fileType === 'png' ?  (
                                                    <p className='p-1.5 rounded-md bg-[#4764aa]'><TbPng className='text-xl text-white'/></p>
                                                ) : (
                                                    <p className='p-1.5 rounded-md bg-[#4764aa]'><TbJpg className='text-xl text-white'/></p>
                                                )}
                                            </div>
                                            
                                            <div className='space-y-0.5 my-auto'>
                                                <p className='overflow-hidden text-xs w-72 text-ellipsis whitespace-nowrap'>{fileName}</p>
                                                <p className='text-[0.7rem] text-[#7c7c7c]'>{doc.type} • {formattedDate}</p>
                                            </div>
                                        </div>
                                    </button>
                                )
                            })
                        ) : <p className='text-center'>No Document Found</p>}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchFile
