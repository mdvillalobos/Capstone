import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Navigation from "../../components/Tools/Navigation.jsx";
import ApplicationTable from '../../components/AdminComponents/ApplicationComponents/ApplicationTable.jsx';
import Header from '../../components/Tools/Header.jsx';
import ContentLoader from '../../components/Tools/ContentLoader.jsx';
import { RankContext } from '../../../context/rankContext.jsx';

const AdminApplication = () => {
    const { config } = useContext(RankContext)
    const [ data, setData ] = useState([]);
    const [ loading, setIsLoading ] = useState(true);
    const [ isMobile, setIsMobile ] = useState(false);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); 
    };

    useEffect(() => {
      handleResize();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    useEffect(() => {
        axios.get(`/api/getApplications?academicYear=${config?.academicYear}`)
        .then(res => setData(res.data))
        .catch(err => console.error(err))
        .finally(() => setIsLoading(false))
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
        <div className="flex flex-col min-h-screen font-Poppins">
            <div className="flex flex-grow">
                <Navigation />
                <div className="flex flex-col flex-1 px-6 py-4 space-y-6">
                    <Header
                        pageTitle={'Applications'} 
                        pageDescription={'View and review all re-ranking applications submitted by users.'}
                    />

                    <div className='flex flex-1 space-y-4'>
                        {loading ? <ContentLoader/> : <ApplicationTable data={data}/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminApplication
