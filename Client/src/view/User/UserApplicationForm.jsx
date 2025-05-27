import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import Header from '../../components/Tools/Header.jsx';
import axios from 'axios';
import Navigation from "../../components/Tools/Navigation.jsx";
import ApplicationForm from '../../components/ReRankingFormComponents/ApplicationForm.jsx';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext.jsx';
import { RankContext } from '../../../context/rankContext.jsx';
import ContentLoader from '../../components/Tools/ContentLoader.jsx';

const UserApplicationForm = () => {
    const { config } = useContext(RankContext);
    const { applicationData, setApplicationData } = useContext(UserContext);
    const [ loading, setIsLoading] = useState(false)

    useEffect(() => {
        if(!applicationData) {
            if (!config?.academicYear) return;
            setIsLoading(true);

            axios.get(`/api/getEntry?academicYear=${config.academicYear}`)
                .then(res => {
                    if (JSON.stringify(res.data) !== JSON.stringify(applicationData)) {
                        setApplicationData(res.data);
                    }
                })
                .finally(() => setIsLoading(false));
       }
    }, [config?.academicYear]);

    return (
        <div className="flex flex-col min-h-screen font-Poppins">
            <div className="flex flex-grow">
                <Navigation />
                <div className="flex flex-col flex-1 px-6 py-4 space-y-6">
                    <Header
                        pageTitle={'Application'} 
                        pageDescription={'Submit documents to apply for rank update'}
                    />
                    <div className='flex flex-col flex-1 space-y-4'>
                        {loading ? (
                            <ContentLoader/>
                        ) : (
                            <>
                                <div className="flex text-sm font-medium text-TextSecondary">
                                    <Link to='/application' className='duration-200 hover:underline'>Application</Link>
                                    <MdKeyboardArrowRight className='my-auto'/>
                                    <p>{applicationData?.name}</p>
                                </div>
                                <ApplicationForm/>
                            </>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default UserApplicationForm
