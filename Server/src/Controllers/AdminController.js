import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Account from '../Models/Account.js';
import Ranks from '../Models/Ranks.js';
import Configuration from '../Models/Config.js';
import { hashPassword, compareHashed } from '../Helpers/Auth.js';
dotenv.config();

export const updateConfig = async (req, res) => {
    const { id, academicYear, reRankingStatus } = req.body;

    try {
        const formatDate = (date) => new Date(date).toISOString().split('T')[0];
        const todayDate = formatDate(new Date());
        const startDate = formatDate(reRankingStatus.startDate);

        const updatedReRankingStatus = {
            ...reRankingStatus,
            isReRankingOpen: startDate <= todayDate ? true : false,
        };

        if(!reRankingStatus.isReRankingSet) {
            updatedReRankingStatus = {
                ...reRankingStatus,
                isReRankingOpen: false,
                startDate: null,
                endDate: null
            }
        }

        const updatedConfig = id 
            ? await Configuration.updateOne({ _id: id}, { $set: { academicYear: academicYear, reRankingStatus: updatedReRankingStatus }}) 
            : await Configuration.create({ academicYear: academicYear, reRankingStatus, updatedReRankingStatus });

        return res.status(200).json({ meesage: 'Configuration Successfully Updated', data: updatedConfig })
    }
    catch(error) {
        console.error(`Updating System Configuration Error ${ error.message }`);
        return res.status(500).json({ error: 'An internal error occurred. Please try again later!'});
    }
}

export const getConfigurations = async (req, res) => {
    try {
        const [config] = await Configuration.find(); 

        if (config) {
            const formatDate = (date) => new Date(date).toISOString().split('T')[0];
            const todayDate = formatDate(new Date());
            const startDate = formatDate(config.reRankingStatus.startDate);
            const endDate = formatDate(config.reRankingStatus.endDate);
        
            let updated = false;
        
            if (startDate === todayDate && !config.reRankingStatus.isReRankingOpen) {
                config.reRankingStatus.isReRankingOpen = true;
                updated = true;
            }
        
            if (endDate === todayDate && config.reRankingStatus.isReRankingOpen) {
                config.reRankingStatus.isReRankingOpen = false;
                updated = true;
            }
        
            if (updated) await config.save();
        }

        return res.status(200).json(config);
    } catch (error) {
        console.error(`Fetching Configuration Error ${ error.message }`);
        return res.status(500).json({ error: 'An internal error occurred. Please try again later!'});
    }
}

export const updateApplicationApprovers = async (req, res) => {
    const { approverList } = req.body;

    try {
        const approverEmails = approverList.map(a => a.email);

        const approversAccounts = await Account.find({ email: { $in: approverEmails } });

        const emailToAccountMap = new Map();

        approversAccounts.forEach(acc => {
            emailToAccountMap.set(acc.email, acc);
        });

        const bulkOps = approverList.map((approver, index) => {
            const account = emailToAccountMap.get(approver.email);

            if (!account) return null;

            return {
                updateOne: {
                    filter: { _id: account._id },
                    update: { $set: { approverNumber: index + 1 } }
                }
            };
        }).filter(Boolean);

        if (bulkOps.length > 0) {
            await Account.bulkWrite(bulkOps);
        }

        return res.status(200).json({ message: 'Approver list successfully updated' })
    }
    catch (error) {
        console.error(`Updating approver list error ${ error.message }`)
        return res.status(500).json({ error: 'An internal error occured. Please try again later!'})
    }
}

export const getApproverList = async (req, res) => {
    try {
        const approverList = await Account.find({ approverNumber : { $ne: null }})
            .select('email approverNumber accountinfo.firstName accountinfo.lastName accountinfo.sex accountinfo.profilePicture')
            .sort({ approverNumber: 1 });

        return res.status(200).json(approverList)
    }
    catch (error) {
        console.error(`Getting Approver List ${ error.message }`)
        return res.status(500).json({ error: 'An internal error occured. Please try again later!'})
    }
}

export const createRank = async (req, res) => {
    const { rankName, track, requirements } = req.body;

    if(!rankName || !track) {
        return res.status(200).json({ error: 'Required all fields!' });
    }

    try {
        const isRankExisting = await Ranks.findOne({ rankName: rankName, track: track });

        if(isRankExisting) { 
            return res.status(200).json({ error: `Rank is already existed from ${track}` }) 
        } 

        await Ranks.create({ 
            rankName: rankName, 
            track: track, 
            requirements: requirements 
        }) 

        return res.status(200).json({ message: 'Rank successfully created.', });


    } catch (error) {
        console.error(`Creation Of Rank Error: ${ error.message }`);  
        return res.status(500).json({ error: 'An internal error occurred. Please try again later!' });
    }
} 

export const getRanks = async (req, res) => {
    try {
        const rankData = await Ranks.find();
        if(!rankData) {
            return res.status(200).json({ error: 'Ranks are currently empty.' });
        }  
        
        return res.status(200).json(rankData)

    } catch (error) {
        console.error(`Fetching Rank Requirement Error: ${ error.message }`);
        return res.status(500).json({ error: 'An internal error occurred. Please try again later!' });
    }
}


export const registerAdmin = async (req, res) => {
    const { token } = req.cookies;
    const { employeeID, email, firstName, lastName, middleName, sex, contact, password } = req.body;

    try {
        const [ existingID, existingEmail, hashUserPassword ] = await Promise.all([
            Account.findOne({ employeeID: employeeID}),
            Account.findOne({ email: email }),
            hashPassword(password),
        ]);

        if(existingID) {
            return res.status(200).json({ error: 'Employee ID already exist!'});
        }

        if(existingEmail) {
            return res.status(200).json({ error: 'Email already exist!'})
        }

        await Account.create({ 
            employeeID: employeeID,
            email: email,
            role: 'admin',
            password: hashUserPassword,
            isVerified: true,
            accountinfo: {
                firstName,
                lastName,
                middleName,
                contact,
                sex,
                status: null,
                track: null,
                rank: null,
                college: null,
                department: null,
            }
        })

        return res.status(200).json({ message: 'Admin succesfully created.'})
    }

    catch(error) {
        console.error(`Registering Admin Error: ${ error.message }`);
        return res.status(500).json({ error: 'An internal server error occurred.' });
    }
}

export const getAllAccount = async (req, res) => {
    try {
        const Accounts = await Account.find().select('employeeID email role isVerified accountinfo.lastName accountinfo.firstName')
        return res.status(200).json(Accounts)
    }
    catch (error) {
        console.error(`Fetching Accounts Error: ${ error.message }`);
        return res.status(500).json({ error: 'An internal server error occurred.' });
    }
}
