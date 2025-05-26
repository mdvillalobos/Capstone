import { useCallback, useContext, useEffect, useState } from 'react';
import { RankContext } from '../../../context/rankContext.jsx';
import useCallDashboardAPI from '../../hooks/AdminHooks/useCallDashboardAPI.jsx';
import LoadingSpinner from '../../components/Tools/LoadingSpinner.jsx';

import Navigation from '../../components/Tools/Navigation.jsx';
import Header from '../../components/Tools/Header.jsx';

import Datas from '../../components/AdminComponents/DashboardComponents/Datas.jsx';
import BarGraph from '../../components/AdminComponents/DashboardComponents/BarGraph.jsx';
import LineGraph from '../../components/AdminComponents/DashboardComponents/LineGraph.jsx';
import RankTotal from '../../components/AdminComponents/DashboardComponents/RankTotal.jsx';
import ToPdf from '../../components/AdminComponents/DashboardComponents/ToPdf.jsx';
import ReRankingConfig from '../../components/AdminComponents/DashboardComponents/ReRankingConfig.jsx';
/* import RankModal from '../../components/AdminComponents/DashboardComponents/RankModal.jsx' */

const AdminDashboard = () => {
    const { config } = useContext(RankContext);
    const academicYear =  config?.academicYear || null;
  
    const { getFacultyRankingData, getReRankingData, getApprovedApplications, getApproverList } = useCallDashboardAPI();

    const [ loading, setIsLoading ] = useState(true);
    const [ isMobile, setIsMobile ] = useState(false);
    const [ dashboardData, setDashboardData ] = useState({
        facultyCount: 0,
        totalRank: [],
        rankPerCollege: [],
        approvedApplications: [],
        totalApplicationPerYear: [],
        approverList: []
    })

    const handleResize = useCallback(() => {
        setIsMobile(window.innerWidth < 768); 
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);


    useEffect(() => {
        const fetchData = async () => {   
            setIsLoading(true);
                
            try {
                const [ facultyRankingData, reRankingData, approvedApplications, approverList ] = await Promise.all([
                    getFacultyRankingData(),
                    getReRankingData(academicYear),
                    getApprovedApplications(),
                    getApproverList()
                ]);

                const { totalFaculty, totalRank, totalRankPerCollege } = facultyRankingData.data
                
                setDashboardData({
                    facultyCount: totalFaculty,
                    totalRank: totalRank,
                    rankPerCollege: totalRankPerCollege,
                    approvedApplications: approvedApplications.data,
                    totalApplicationPerYear: reRankingData.data,
                    approverList: approverList.data
                })
                      
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [academicYear]);

    if(loading) return <LoadingSpinner/>

    if (isMobile) {
        return (
            <div className="flex items-center justify-center min-h-screen text-center font-Poppins">
                <div>
                    <h1 className="text-lg font-bold">This page is not available on mobile.</h1>
                    <p>Please visit us on a desktop for a better experience.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen font-Poppins">
            <div className="flex flex-grow">
                <Navigation />
                
                <div className="flex flex-col flex-1 px-6 py-4 space-y-6">
                    <Header 
                        pageTitle={'Dashboard'} 
                        pageDescription={'View analytics, manage data, and oversee platform activity'}
                    />
                    <ToPdf 
                        totalRank={dashboardData.totalRank} 
                        approvedFaculty={dashboardData.approvedApplications}
                    />

                    <div className='flex flex-1 space-x-8'>
                        <div className='flex flex-1 space-x-4'>
                            <div className='flex flex-col flex-1 space-y-4'>
                                <p className='text-sm font-medium tracking-widest text-TextSecondary'>ANALYTICS</p>
                                
                                <div className='flex space-x-4'>
                                    <Datas 
                                        facultyCount={dashboardData.facultyCount} 
                                        applicationCount={dashboardData.totalApplicationPerYear?.[academicYear] || 0} 
                                        approvedApplications={dashboardData.approvedApplications}
                                    />

                                    <BarGraph rankPerCollege={dashboardData.rankPerCollege} />
                                </div>

                                <LineGraph totalApplicationPerYear={dashboardData.totalApplicationPerYear}/>
                            </div>

                            <div className='h-full flex flex-col w-[25%] space-y-4'>
                                <ReRankingConfig approverList={dashboardData.approverList}/>
                                {/* <RankTotal totalPerRank={dashboardData.totalRank}/> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
