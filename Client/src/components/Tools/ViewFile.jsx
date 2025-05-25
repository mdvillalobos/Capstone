import { useEffect, useState }  from 'react'

const ViewFile = ({ handleExit, data }) => {
    const [ showImage, setShowImage ] = useState({
        image: null,
        isPdf: null
    });

    useEffect(() => {
        const fileExtension = data.filePath.split('.').pop().toLowerCase();

        if (['png', 'jpg', 'jpeg'].includes(fileExtension)) {
            setShowImage({ image: data.filePath, isPdf: false });
        } else if (fileExtension === 'pdf') {
            setShowImage({ image: data.filePath, isPdf: true });
        }
    }, [data])

    return (
        <div className='fixed top-0 left-0 z-20 flex items-center justify-center w-screen h-screen overflow-auto bg-black/60'>
            <div className='relative p-4 bg-white rounded-2xl'>
                <button 
                    type="button" 
                    onClick={ handleExit } 
                    className='absolute px-2 text-4xl text-gray-400 duration-300 cursor-pointer right-6 top-5'
                >
                    &times;
                </button> 
                <div className="h-[65vh] w-[45vw] rounded-xl overflow-hidden">
                    {showImage.isPdf ? (
                        <iframe 
                            src={ data.filePath } 
                            width="100%" 
                            height="100%" 
                            title="PDF Viewer" 
                        />
                    ) : (
                        <img 
                            draggable='false' 
                            className='object-fill w-full h-full select-none aspect-auto' 
                            src={ data.filePath } 
                            alt='User Submitted Requirement'
                        />
                    )}
                </div>

                <div className='mt-2 ml-1'>
                    <p className='font-medium'>{data.fileName}</p>
                    <p className='text-sm text-gray-500'>{data.date ? data.date : ''}</p>
                </div>
            </div>
        </div>
    )
}

export default ViewFile