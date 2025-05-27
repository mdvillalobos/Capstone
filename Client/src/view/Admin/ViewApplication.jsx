import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import ViewApplicationForm from '../../components/AdminComponents/ApplicationComponents/ViewApplicationForm.jsx';
import Navigation from "../../components/Tools/Navigation.jsx";
import Header from '../../components/Tools/Header.jsx';

const ViewApplication = () => {
    const location = useLocation();
    const { data } = location.state || {};
    const [ isMobile, setIsMobile ] = useState(false);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 790);
    };
  
    useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    if(isMobile) {
        return (
            <div className="flex items-center justify-center min-h-screen text-center font-Poppins">
                <div>
                    <h1 className="text-lg font-bold">This page is not available on mobile.</h1>
                    <p>Please visit us on a desktop for a better experience.</p>
                </div>
            </div>
        )
    }
    
    return (
        <div className='flex flex-col min-h-screen font-Poppins'>
            <div className="flex flex-grow">
                <Navigation />
                <div className="flex flex-col flex-1 px-6 py-4 space-y-6">
                    <Header 
                        pageTitle={'Applications'} 
                        pageDescription={'View and review all re-ranking applications submitted by users.'}
                    />

                    <div className='flex flex-col flex-1 space-y-4'>
                        <div className="flex text-sm font-medium text-TextSecondary">
                            <Link to='/admin/application' className='duration-200 text-NuButton hover:underline'>Applications</Link>
                            <MdKeyboardArrowRight className='my-auto'/>
                            <p>{data.name}</p>
                        </div>
                        <ViewApplicationForm rest={data}/>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default ViewApplication
