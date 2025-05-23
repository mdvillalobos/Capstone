import axios from "axios";

const useCallDashboardAPI = () => {
    const getFacultyRankingData = () => axios.get('/api/getFacultyRankData');

    const getReRankingData = (academicYear) => axios.get(`/api/getReRankingData?academicYear=${academicYear}`);

    const getApprovedApplications = () => axios.get('/api/getApprovedApplication');

    const getApproverList = () => axios.get('/api/getApproverList');

    return { getFacultyRankingData, getReRankingData, getApprovedApplications, getApproverList }
}

export default useCallDashboardAPI;
