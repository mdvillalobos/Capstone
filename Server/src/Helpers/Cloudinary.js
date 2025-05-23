import dotenv from 'dotenv';
dotenv.config();

import cloudinary from 'cloudinary';
import PQueue from 'p-queue';
const cloudinaryInstance = cloudinary.v2;

cloudinary.config({ 
    cloud_name: process.env.APP_CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.APP_CLOUDINARY_API_KEY, 
    api_secret: process.env.APP_CLOUDINARY_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

const uploadQueue = new PQueue({ concurrency: 5 }); 

export const uploadFileToCloudinary = async (file, folderName, resourceType) => {
    const upload = await cloudinaryInstance.uploader.upload(file, { folder: folderName, resource_type: resourceType });

    const secureUrl = upload.secure_url;
    return secureUrl;
}

export const updateFileToCloudinary = async(filePath) => {
    const publicID = secureURL.split('/').join().split('.')[0];
    await cloudinaryInstance.uploader.upload(filePath, { public_id: publicID });
}

export const filterAndUploadRequirements = async (files, folderName) => {
    const start = Date.now();

    const userSubmittedRequirements = Object.values(files).map(fileArray => {
        const file = fileArray[0];
        const fileType = file.originalname.split('.').pop();
        return {
            requirementNumber: parseInt(file.fieldname.split('_')[1], 10),
            path: file.path,
            filename: file.originalname,
            fileType: fileType
        };
    });

    const imageFileTypes = new Set(['png', 'jpg', 'jpeg']);
    const fileFileTypes = new Set(['pdf']);

    const uploadPromises = userSubmittedRequirements.map(file => {
        if(imageFileTypes.has(file.fileType)) {
            return uploadQueue.add(() => uploadFileToCloudinary(file.path, folderName, 'image',{ concurrent: true }))
        }
        else if(fileFileTypes.has(file.fileType)) {
            return uploadQueue.add(() => uploadFileToCloudinary(file.path, folderName, 'raw', { concurrent: true }))
        }
        return Promise.resolve(null);
    }).filter(Boolean);
    
    const uploadResponses = await Promise.all(uploadPromises);
    
    const response = uploadResponses?.map((response, i) => ({
        requirementNumber: userSubmittedRequirements[i].requirementNumber,
        filePath: response,
        fileName: userSubmittedRequirements[i].filename
    }));

    return response;
}


export const DestroyImageInCloudinary = async (secureURL, folderName) => {
    if(!secureURL) return;
    
    const publicIDWithExtension = secureURL.split('/').pop();      
    const publicID = publicIDWithExtension.split('.')[0];   
    const extName = publicIDWithExtension.split('.').pop();

    const imageFileTypes = new Set(['png', 'jpg', 'jpeg']);
    const fileFileTypes = new Set(['pdf']);

    if(imageFileTypes.has(extName)) {
        return await cloudinary.uploader.destroy(`${folderName}${publicID}`)
    }
    else if(fileFileTypes.has(extName)) {
        return await cloudinary.v2.api.delete_resources([`${folderName}${publicIDWithExtension}`], {type: 'upload', resource_type: 'raw'})
    }
}
