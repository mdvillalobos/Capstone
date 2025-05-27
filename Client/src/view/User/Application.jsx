import { useContext, useEffect, useState } from 'react'
import { RankContext } from '../../../context/rankContext.jsx';
import axios from 'axios';
import Navigation from "../../components/Tools/Navigation.jsx";
import LoadingSpinner from '../../components/Tools/LoadingSpinner.jsx'
import Instruction from '../../components/UserComponents/ApplicationComponents/Instruction.jsx';
import DropDown from '../../components/UserComponents/ApplicationComponents/DropDown.jsx';
import SubmittedPage from '../../components/UserComponents/ApplicationComponents/SubmittedPage.jsx';
import Header from '../../components/Tools/Header.jsx';

const ApplicationForReRanking = () => {
    const { config } = useContext(RankContext)

    const [ data, setData ] = useState();
    const [ loading, setIsLoading ] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/api/getEntry?academicYear=${config?.academicYear}`)
            .then(res => setData(res.data))
            .catch(err => console.error(err))
            .finally(() => setIsLoading(false))
    }, []);

    if(loading) return <LoadingSpinner/>

    return (
        <div className="flex flex-col min-h-screen font-Poppins">
            <div className="flex flex-grow">
                <Navigation />
                <div className="flex flex-col flex-1 px-6 py-4 ">
                    {!data && (
                        <Header
                            pageTitle={'Application'} 
                            pageDescription={'Submit documents to apply for rank update'}
                        />
                    )}
                    <div className={`flex flex-1 ${data && 'justify-center items-center'}`}>
                        {config.reRankingStatus.isReRankingOpen ? (
                            data ? (
                                <SubmittedPage rest={data}/>
                            ) : (
                                <div className='flex flex-col'>
                                    <Instruction/>
                                    <DropDown/>
                                </div>
                            )
                        ) : (
                            <p>SARADO APPLICATION FOR RE-RANKING</p>
                        )}
                        
                    </div>
                    
                </div>
            </div>
            
      
        </div>
    )
}

export default ApplicationForReRanking
