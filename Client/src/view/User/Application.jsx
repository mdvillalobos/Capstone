import { useContext, useEffect, useState } from 'react'
import { RankContext } from '../../../context/rankContext.jsx';
import axios from 'axios';
import Navigation from "../../components/Tools/Navigation.jsx";
import Instruction from '../../components/UserComponents/ApplicationComponents/Instruction.jsx';
import DropDown from '../../components/UserComponents/ApplicationComponents/DropDown.jsx';
import SubmittedPage from '../../components/UserComponents/ApplicationComponents/SubmittedPage.jsx';
import Header from '../../components/Tools/Header.jsx';
import ContentLoader from '../../components/Tools/ContentLoader.jsx';
import { UserContext } from '../../../context/userContext.jsx';

const ApplicationForReRanking = () => {
    const { applicationData, setApplicationData } = useContext(UserContext)
    const { config } = useContext(RankContext)

    const [ loading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!config?.academicYear) return;
        setIsLoading(true);

        axios.get(`/api/getEntry?academicYear=${config.academicYear}`)
            .then(res => {
                if (JSON.stringify(res.data) !== JSON.stringify(applicationData)) {
                    setApplicationData(res.data);
                }
            })
            .finally(() => setIsLoading(false));
    }, [config?.academicYear]);

    return (
        <div className="flex flex-col min-h-screen font-Poppins">
            <div className="flex flex-grow">
                <Navigation />
                <div className="flex flex-col flex-1 px-6 py-4 ">
                    {!applicationData && (
                        <Header
                            pageTitle={'Application'} 
                            pageDescription={'Submit documents to apply for rank update'}
                        />
                    )}
                    <div className={`flex flex-1 ${applicationData && 'justify-center items-center'}`}>
                        {loading ? (
                            <ContentLoader/>
                        ) : 
                            config.reRankingStatus.isReRankingOpen ? (
                                applicationData ? (
                                    <SubmittedPage />
                                ) : (
                                    <div className='flex flex-col w-full'>
                                        <Instruction/>
                                        <DropDown/>
                                    </div>
                                )
                            ) : (
                                <p className='flex bg-red-400 text-white py-3 px-5 text-xl font-medium shadow-lg rounded-lg'>Application for re-ranking is currently close.</p>
                            )
                        }
                    </div>
                    
                </div>
            </div>
            
      
        </div>
    )
}

export default ApplicationForReRanking
