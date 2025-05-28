import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Account from '../Models/Account.js';
import Ranks from '../Models/Ranks.js';
import Configuration from '../Models/Config.js';
import { hashPassword, compareHashed } from '../Helpers/Auth.js';
dotenv.config();

export const checkAdminPassowrd = async (req, res) => {
    const { token } = req.cookies;
    const { password } = req.body;

    if(!password) {
        return res.json({ error: 'Required all fields!' })
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const adminData = await Account.findOne({ email: email })

        const checkPassword = await compareHashed(password, adminData.password)
        
        if(!checkPassword) {
            return res.json({ error: 'Incorrect Password!'})
        }

        return res.json({ message: 'Verified Successfully', data: checkPassword })
    }
    catch(error) {
        console.error(`Verifying Admin Password Error: ${ error.message }`)
        return res.json({ error: 'An internal error occurred. Please try again later!' })
    }
}

export const updateConfig = async (req, res) => {
    const { id, academicYear, reRankingStatus } = req.body;

    try {
        const formatDate = (date) => new Date(date).toISOString().split('T')[0];

        let updatedReRankingStatus;

        if (!reRankingStatus.isReRankingSet) {
            updatedReRankingStatus = {
                ...reRankingStatus,
                isReRankingOpen: false,
                startDate: '',
                endDate: ''
            };
            
        } else {
            const todayDate = formatDate(new Date());
            const startDate = formatDate(reRankingStatus.startDate);

            updatedReRankingStatus = {
                ...reRankingStatus,
                isReRankingOpen: todayDate <= startDate,
            };
        }

        const updatedConfig = id 
            ? await Configuration.findOneAndUpdate({ _id: id }, { $set: { academicYear: academicYear, reRankingStatus: updatedReRankingStatus }}, { new: true }) 
            : await Configuration.create({ academicYear: academicYear, reRankingStatus, updatedReRankingStatus });
        
        return res.json({ meesage: 'Configuration Successfully Updated', config: updatedConfig })
    }
    catch(error) {
        console.error(`Updating System Configuration Error ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
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

        return res.json(config);
    } catch (error) {
        console.error(`Fetching Configuration Error ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!'});
    }
}

export const updateApplicationApprovers = async (req, res) => {
    const { approverList } = req.body;

    try {
        const adminAccounts = await Account.find({ role: 'admin' });

        const emailToAccountMap = new Map();

        approverList.forEach((acc, index) => {
            emailToAccountMap.set(acc.email, {...acc, index });
        });

        const bulkOps = adminAccounts.map(approver => {
            const account = emailToAccountMap.get(approver.email);

            if(approver.approverNumber && !account) {
                console.log('utot')
                return {
                    updateOne: {
                        filter: { _id: approver._id },
                        update: { $set: { approverNumber: null } }
                    }
                }; 
            }

            if (!account) return null;

            return {
                updateOne: {
                    filter: { _id: account._id },
                    update: { $set: { approverNumber: account.index + 1 } }
                }
            };
        }).filter(Boolean);

        if (bulkOps.length > 0) {
            await Account.bulkWrite(bulkOps);
        }

        return res.json({ message: 'Approver list successfully updated' })
    }
    catch (error) {
        console.error(`Updating approver list error ${ error.message }`)
        return res.json({ error: 'An internal error occured. Please try again later!'})
    }
}

export const getAdminAccount = async (req, res) => {
    try {
        const approverList = await Account.find({ role : 'admin' })
            .select('email approverNumber accountinfo.firstName accountinfo.lastName accountinfo.sex accountinfo.profilePicture')

        return res.json(approverList)
    }
    catch (error) {
        console.error(`Getting Approver List ${ error.message }`)
        return res.json({ error: 'An internal error occured. Please try again later!'})
    }
}

export const createRank = async (req, res) => {
    const { rankName, track, requirements } = req.body;

    if(!rankName || !track) {
        return res.json({ error: 'Required all fields!' });
    }

    try {
        const isRankExisting = await Ranks.findOne({ rankName: rankName, track: track });

        if(isRankExisting) { 
            return res.json({ error: `Rank is already existed from ${track}` }) 
        } 

        await Ranks.create({ 
            rankName: rankName, 
            track: track, 
            requirements: requirements 
        }) 

        return res.json({ message: 'Rank successfully created.', });


    } catch (error) {
        console.error(`Creation Of Rank Error: ${ error.message }`);  
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
} 

export const getRanks = async (req, res) => {
    try {
        const rankData = await Ranks.find();
        if(!rankData) {
            return res.json({ error: 'Ranks are currently empty.' });
        }  
        
        return res.json(rankData)

    } catch (error) {
        console.error(`Fetching Rank Requirement Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
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
            return res.json({ error: 'Employee ID already exist!'});
        }

        if(existingEmail) {
            return res.json({ error: 'Email already exist!'})
        }

        await Account.create({ 
            employeeID: employeeID,
            email: email,
            role: 'admin',
            password: hashUserPassword,
            isVerified: true,
            accountinfo: {
                firstName: firstName,
                lastName: lastName,
                middleName: middleName,
                contact: contact,
                sex: sex,
            }
        })

        return res.json({ message: 'Admin succesfully created.'})
    }

    catch(error) {
        console.error(`Registering Admin Error: ${ error.message }`);
        return res.json({ error: 'An internal server error occurred.' });
    }
}

export const getAllAccount = async (req, res) => {
    try {
        const Accounts = await Account.find().select('_id employeeID email role isVerified isActive accountinfo.lastName accountinfo.firstName')
        return res.json(Accounts)
    }
    catch (error) {
        console.error(`Fetching Accounts Error: ${ error.message }`);
        return res.json({ error: 'An internal server error occurred.' });
    }
}

export const updateAccount = async (req, res) => {
    const { id, action } = req.body;

    try {
        const userData = await Account.findByIdAndUpdate(id, { isActive: action })

        return res.json({ message: `Account sucessfully ${action}`})
    } catch (error) {
        console.error(`Updating Account Error!: ${ error.message }`);
        return res.json({ error: 'An internal server error occurred.' });
    }
}
