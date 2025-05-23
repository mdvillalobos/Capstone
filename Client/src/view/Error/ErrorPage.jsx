import { Link } from 'react-router-dom';
import ErrorImage from '../../assets/images/404.webp';

const ErrorPage = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-[90vh] font-Montserrat select-none'>
            <p className='font-black text-[2.8rem] text-[#3e65c4]'>PAGE NOT FOUND</p>
            <img draggable="false" src={ErrorImage} alt="404 error" className='w-[55vw] h-[45vh]'/>
            <p className='mt-4 text-xl font-medium text-center'>
                We're sorry something is not working here.
            </p>
            <Link to='/' className='bg-[#3e65c4] rounded-full px-14 py-3 text-white shadow-base hover:bg-NuButtonHover duration-200 font-bold mt-5'>GO BACK HOME</Link>
        </div>
    )
}

export default ErrorPage
