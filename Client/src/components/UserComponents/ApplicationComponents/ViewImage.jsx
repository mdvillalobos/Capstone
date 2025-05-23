import {useState} from 'react'
import { RxCross2 } from 'react-icons/rx';

const ViewImage = ({ isModalOpen, setIsModalOpen, userFiles }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleCloseModal = () => setIsModalOpen(false);
  
    const handleNext = () => {
      if (currentIndex < userFiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    };
    
    const handlePrevious = () => {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
    return (
      <div>
        {isModalOpen && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75'>
            <div className='w-3/4 max-w-lg p-4 bg-white rounded-lg shadow-lg'>
              <button onClick={handleCloseModal} className='absolute text-gray-500 top-2 right-2'>
                <RxCross2 size={24} />
              </button>

              <div className='text-center'>
                <img src={userFiles?.files[currentIndex]?.filePath} alt={userFiles?.files[currentIndex]?.fileName} className='w-full h-auto rounded-md' />
                <p className='mt-2'>{userFiles?.files[currentIndex]?.fileName}</p>
              </div>

              {userFiles.files[currentIndex]?.length > 1 && (
                <div className='flex justify-between mt-4'>
                  <button onClick={handlePrevious} disabled={currentIndex === 0} className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'>
                    Previous
                  </button>
                  
                  <button onClick={handleNext} disabled={currentIndex === userFiles?.files?.length - 1} className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'>
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    )
}

export default ViewImage
