import dotenv from 'dotenv';
dotenv.config();
import Account from '../Models/Account.js';
import ApplicationForms from '../Models/ApplicationForms.js';

export const getFacultyRankData = async (req, res) => {
    try {
        const [ userAccount, totalFaculty ] = await Promise.all([
            Account.find({ 'accountinfo.rank': { $ne: null }, isVerified : true }),
            Account.countDocuments({ accountinfo : { $ne: [] }, 'accountinfo.rank': { $ne: null } })
        ]);

        const countRankPerCollege = {};
        const countRankTotal = {};

        userAccount.forEach(({ accountinfo: [{ college, rank }] }) => {
            if (rank) {
                countRankTotal[rank] = (countRankTotal[rank] || 0) + 1;
                if (college) {
                    countRankPerCollege[rank] = countRankPerCollege[rank] || { rankName: rank, rankCounts: {} };
                    countRankPerCollege[rank].rankCounts[college] = (countRankPerCollege[rank].rankCounts[college] || 0) + 1;
                }
            }
        });

        return res.json({ totalFaculty: totalFaculty, totalRank: countRankTotal, totalRankPerCollege: Object.values(countRankPerCollege) })
    }

    catch(error) {
        console.error(error);
        return res.json({ error: 'An internal error occurred. Please try again later!' })
    }
}

export const getReRankingData = async (req, res) => {
    const { academicYear } = req.query;

    console.log(academicYear)

    try {
        if(academicYear) {
            const years = { [academicYear]: 0 };

            for (let i = 1; i <= 4; i++) {
                let [startYear, endYear] = academicYear.split('-').map(Number);
                let year = `${startYear - i}-${endYear - i}`;
                years[year] = 0;
            }

            const applications =  await ApplicationForms.find();

            applications.forEach(applicationData => {
                if(years[applicationData.academicYear] !== undefined) {
                    years[applicationData.academicYear]++;
                }
            })
            return res.json(years);
        }

        return res.json(null)
    } catch (error) {
        console.error(`Get total applications error: ${error}`);
        return res.json({ error: 'An internal error occurred. Please try again later!' })
    }
}

export const getApprovedApplications = async (req, res) => {
    const { academicYear } = req.query;

    try {
        const approvedApplication = await ApplicationForms.find({ purpose: 'application', applicationStatus: 'Approved', academicYear: academicYear });
        return res.json(approvedApplication);

    } catch (error) {
        console.error(`Getting approved applications error: ${error}`);
        return res.json({ error: 'An internal error occurred. Please try again later!' })
    }
}

