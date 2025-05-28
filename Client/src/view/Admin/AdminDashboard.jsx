import { useCallback, useContext, useEffect, useState } from 'react';
import { RankContext } from '../../../context/rankContext.jsx';
import useCallDashboardAPI from '../../hooks/AdminHooks/useCallDashboardAPI.jsx';

import Navigation from '../../components/Tools/Navigation.jsx';
import Header from '../../components/Tools/Header.jsx';
import ContentLoader from '../../components/Tools/ContentLoader.jsx';

import Datas from '../../components/AdminComponents/DashboardComponents/Datas.jsx';
import BarGraph from '../../components/AdminComponents/DashboardComponents/BarGraph.jsx';
import LineGraph from '../../components/AdminComponents/DashboardComponents/LineGraph.jsx';
import ToPdf from '../../components/AdminComponents/DashboardComponents/ToPdf.jsx';
import ReRankingConfig from '../../components/AdminComponents/DashboardComponents/ReRankingConfig.jsx';

const AdminDashboard = () => {
    const { config } = useContext(RankContext);
    const academicYear =  config?.academicYear || null;
  
    const { getFacultyRankingData, getReRankingData, getApprovedApplications, getAdminAccounts } = useCallDashboardAPI();

    const [ loading, setIsLoading ] = useState(true);
    const [ isMobile, setIsMobile ] = useState(false);
    const [ dashboardData, setDashboardData ] = useState({
        facultyCount: 0,
        totalRank: [],
        rankPerCollege: [],
        approvedApplications: [],
        totalApplicationPerYear: [],
        adminAccounts: []
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
                const [ facultyRankingData, reRankingData, approvedApplications, adminAccounts ] = await Promise.all([
                    getFacultyRankingData(),
                    getReRankingData(academicYear),
                    getApprovedApplications(),
                    getAdminAccounts()
                ]);

                const { totalFaculty, totalRank, totalRankPerCollege } = facultyRankingData.data
                
                setDashboardData({
                    facultyCount: totalFaculty,
                    totalRank: totalRank,
                    rankPerCollege: totalRankPerCollege,
                    approvedApplications: approvedApplications.data,
                    totalApplicationPerYear: reRankingData.data,
                    adminAccounts: adminAccounts.data
                })
                      
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

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
                    <div className='flex flex-col flex-1 space-y-4'>
                        <div className='flex flex-1'>
                            {loading ? (
                                <ContentLoader/>
                            ) : (
                                <div className='flex flex-col flex-1 space-y-2'>  
                                    <ToPdf 
                                        totalRank={dashboardData.totalRank} 
                                        approvedFaculty={dashboardData.approvedApplications}
                                    />
                                    <div className='flex space-x-4'>
                                        <div className='flex flex-col flex-1 space-y-4'>        
                                            <div className='flex space-x-4'>
                                                <Datas 
                                                    facultyCount={dashboardData.facultyCount} 
                                                    applicationCount={dashboardData.totalApplicationPerYear?.[academicYear] || 0} 
                                                    approvedApplications={dashboardData.approvedApplications}
                                                    loading={loading}
                                                />

                                                <BarGraph rankPerCollege={dashboardData.rankPerCollege} loading={loading}/>
                                            </div>

                                            <LineGraph totalApplicationPerYear={dashboardData.totalApplicationPerYear} loading={loading}/>
                                        </div>

                                        <div className='h-full flex flex-col w-[25%] space-y-4'>
                                            <ReRankingConfig adminAccounts={dashboardData.adminAccounts} loading={loading}/>
                                            {/* <RankTotal totalPerRank={dashboardData.totalRank}/> */}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
