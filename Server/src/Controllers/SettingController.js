import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import validator from 'validator';
import Account from '../Models/Account.js';
import { uploadFileToCloudinary, DestroyImageInCloudinary } from '../Helpers/Cloudinary.js';
import { hashPassword } from '../Helpers/Auth.js';

export const changePassword = async (req, res) => {
    const { token } = req.cookies;
    const { newPassword, confirmNewPassword } = req.body;

    if(!token) return res.json({ error: 'Access denied!'});

    if (!newPassword || !confirmNewPassword) {
        return res.json({ error: 'Required all fields' });
    }

    if (newPassword !== confirmNewPassword) {
        return res.json({ error: "Passwords don't match!" });
    }

    if (!validator.isStrongPassword(newPassword)) {
        return res.json({ error: 'Password is too weak.' });
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        const hashedPassword = await hashPassword(newPassword);
        await Account.updateOne({ email }, { password: hashedPassword });

        return res.json({ message: 'Password updated successfully.' });
   
    } catch (error) {
        console.error(`Change Password Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const updateProfile = async (req, res) => {
    const { token } = req.cookies;
    if(!token) return res.json({ error: 'Access denied!' });

    const { lastName, firstName, middleName, contact, college, department, status } = req.body;

    try {
        console.log(req.file)
        const { email } = jwt.verify(token, process.env.JWT_SECRET); 
        const userData = await Account.findOne({ email: email });

        if (!userData) return res.json({ error: 'User data not found!' })

        if(req.file) {
            await handleProfilePictureUpdate(userData, req.file.path)
        }

        const updatedFields = { lastName, firstName, middleName, contact, college, department, status };
        Object.keys(updatedFields).forEach((key) => {
            const value = updatedFields[key];
            userData.accountinfo[0][key] = value || '';
        });

        await userData.save();
        return res.json({ message: 'Successfully updated user name.' });
        
    } catch (error) {
        console.error(`Update User Details Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

const handleProfilePictureUpdate = async (userData, filePath) => {
    const currentProfilePicture = userData.accountinfo[0]?.profilePicture;
    
    const deleteImage = currentProfilePicture 
        ? DestroyImageInCloudinary(currentProfilePicture, 'ProfilePictures')
        : Promise.resolve(null);
    
    const uploadImage = uploadFileToCloudinary(filePath, 'ProfilePictures', 'image');
    
    const [deleteResponse, uploadResponse] = await Promise.all([deleteImage, uploadImage]);

    userData.accountinfo[0].profilePicture = uploadResponse;
};

