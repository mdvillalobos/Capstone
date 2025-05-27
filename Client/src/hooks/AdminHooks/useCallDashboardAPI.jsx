import axios from "axios";

const useCallDashboardAPI = () => {
    const getFacultyRankingData = () => axios.get('/api/getFacultyRankData');

    const getReRankingData = (academicYear) => axios.get(`/api/getReRankingData?academicYear=${academicYear}`);

    const getApprovedApplications = () => axios.get('/api/getApprovedApplication');

    const getAdminAccounts = () => axios.get('/api/getAdminAccount');

    return { getFacultyRankingData, getReRankingData, getApprovedApplications, getAdminAccounts }
}

export default useCallDashboardAPI;
