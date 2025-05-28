import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import Account from '../Models/Account.js';
import Credentials from '../Models/Credentials.js';
import { uploadFileToCloudinary, DestroyImageInCloudinary } from '../Helpers/Cloudinary.js';
/* import { io } from '../../index.js' */

export const getUserData = async (req, res) => {
    const { token, verificationToken } = req.cookies;

    const jwtToken = token || verificationToken
    
    if(!jwtToken) {
        return res.json(null);
    }


    try {
        const { email } = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userCredentials = await Account.findOne({ email });

        if (userCredentials) {
            const userObject = {
                ...userCredentials.accountinfo.toObject()[0],
                isVerified: userCredentials.isVerified,
                email: email,
                role: userCredentials.role,
                employeeID: userCredentials.employeeID
            };
            return res.json(userObject);
        }
        return res.json(null); 

    } catch (error) {
        console.error(`Fetching User Data Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const addCredential = async (req, res) => {
    const { token } = req.cookies;
    const { documentCategory, documentType, metricsValue, documentTags } = req.body;

    if(!documentCategory || !documentType || !req.file || !documentTags) {
        return res.json({ error: 'Required all fields!'})
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const [ cloudinaryResponse, userData ] = await Promise.all([
            await uploadFileToCloudinary(req.file.path, 'credentials'),
            await Credentials.findOne({ email: email }),
        ])

        const userFile = {
            category: documentCategory,
            type: documentType,
            filePath: cloudinaryResponse,
            fileName: req.file.originalname,
            metrics: metricsValue ? metricsValue : null,
            tags: documentTags,
        }

        if(userData) {
            userData.files.push(userFile);
            await userData.save();
        }

        else {
            await Credentials.create({
                email: email,
                files: userFile
            });
        }
        
        return res.json({ message: 'Credential uploaded successfully!'})
    }


    catch (error) {
        console.log(error);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const getUserCredentials = async (req, res) => {
    const { token } = req.cookies;
    
    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userCredentials = await Credentials.findOne({ email });
        return res.json(userCredentials);
    }

    catch (error) {
        console.error(`Fetching User Credentials Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const updateCredentialStatus = async (req, res) => {
    const { token } = req.cookies;
    const { selectedFiles, action } = req.body;

    if(selectedFiles.length < 0 || !action) {
        return res.json({ error: 'Required all fields! '});
    }

    console.log(action)
    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userCredentials = await Credentials.findOne({ email });

        if (!userCredentials) {
            return res.json({ message: 'User not found' });
        }

        const filesToDeleteFromCloud = [];

        userCredentials.files = userCredentials.files.map(file => {
            const isFileIncluded = selectedFiles.includes(file.filePath);
            if(!isFileIncluded) return file

            if(action === 'delete') {
                if (!file.isActive) {
                    filesToDeleteFromCloud.push(file.filePath);
                    return null; // Filter this out if it's truly deleted
                } else {
                    file.isActive = false;
                }
            }
            else if (action === 'recover') {
                if(!file.isActive) {
                    file.isActive = true;
                }
            }

            return file;
            
        }).filter(Boolean);

        if(action === 'delete' && filesToDeleteFromCloud.length > 0) {
            console.log('tae')
            await Promise.all(
                filesToDeleteFromCloud.map(
                    filePath => DestroyImageInCloudinary(filePath, 'Credentials')
                )
            );
        }

        await userCredentials.save();
        const message = action === 'delete' ? 'Files successfully deleted' : 'Files successfully recovered';
        return res.json({ message: message });
    }
    catch(error) {
        console.log(error);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}
