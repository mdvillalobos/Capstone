import RestrictedImage from '../../assets/images/restricted.webp';
import { Link } from 'react-router-dom';

const Restriction = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-[90vh] font-Montserrat select-none'>
            <p className='font-black text-[2.8rem] text-[#3e65c4]'>NO AUTHORIZATION FOUND.</p>
            <img draggable="false" src={RestrictedImage} alt="Restriction Image" className='w-[48vw] h-[48vh]'/>
            <p className='mt-4 text-xl font-medium text-center'>
                You're not authorized to access this page using the credentials that you supplied.
            </p>
            <Link to ='/' className='bg-[#3e65c4] rounded-full px-14 py-3 text-white shadow-base hover:bg-NuButtonHover duration-200 font-bold mt-5'>GO BACK TO HOME</Link>
        </div>
    )
}

export default Restriction
