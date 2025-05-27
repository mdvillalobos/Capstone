import { Router } from 'express';
const router = Router();

import { login, register, verifyEmail, registerProfile, forgotPassword, resetPassword, logout, resendOTP } from '../Controllers/AuthController.js';
import { getUserData, addCredential, getUserCredentials, updateCredentialStatus } from '../Controllers/UserController.js';
import { changePassword, updateProfile } from '../Controllers/SettingController.js'
import { checkAdminPassowrd, updateConfig, getConfigurations, updateApplicationApprovers, getAdminAccount, createRank, getRanks, registerAdmin, getAllAccount, updateAccount } from '../Controllers/AdminController.js';
import { checkExistingEntry, getApplicationsForReRanking, submitApplicationEntry, updateApplication, cancelSubmission, submitApplicationReview} from '../Controllers/ApplicationController.js';
import { getFacultyRankData, getReRankingData, getApprovedApplications } from '../Controllers/AnalyticsController.js'; 

import authorizationMiddleware from '../Middleware/authorizationMiddleware.js';
import { upload, multerErrorHandler } from'../Middleware/uploadMiddleware.js';

// login & logout
router.post('/api/login', login);
router.post('/api/logout', logout);

//registration process
router.post('/api/register', register);
router.post('/api/registeProfile', upload.single('profilePicture'), registerProfile);

//email verification 
router.post('/api/verifyEmail', verifyEmail);
router.post('/api/resendOTP', resendOTP);

//forgot password process
router.post('/api/forgot', forgotPassword);
router.post('/api/resetpassword', resetPassword);

//settings
router.post('/api/updateProfile', upload.single('profilePicture'), updateProfile);
router.post('/api/changepassword', changePassword);

//user
router.get('/api/getProfile', getUserData);
router.post('/api/addCredential', upload.single('file'), addCredential);
router.get('/api/getUserCredentials', authorizationMiddleware('user'), getUserCredentials);
router.post('/api/updateCredentialStatus', authorizationMiddleware('user'), updateCredentialStatus);

//Application for re-ranking
router.get('/api/getEntry', authorizationMiddleware('user'), checkExistingEntry);
router.get('/api/getAllRank', getRanks);
router.post('/api/submitEntry', authorizationMiddleware('user'), submitApplicationEntry);
router.post('/api/updateApplication', authorizationMiddleware('user'), updateApplication)
router.post('/api/cancelEntry', authorizationMiddleware('user'), cancelSubmission)

//admin 
router.post('/api/checkAdminPassword', authorizationMiddleware('admin'), checkAdminPassowrd)
router.get('/api/getApplications', authorizationMiddleware('admin'), getApplicationsForReRanking);
router.post('/api/reviewApplication', authorizationMiddleware('admin'), submitApplicationReview);
router.post('/api/updateConfig', authorizationMiddleware('admin'), updateConfig);
router.post('/api/updateApproverList', authorizationMiddleware('admin'), updateApplicationApprovers);
router.get('/api/getAdminAccount', authorizationMiddleware('admin'), getAdminAccount);
router.post('/api/createRank', authorizationMiddleware('admin'), createRank);
router.post('/api/registerAdmin', authorizationMiddleware('admin'), registerAdmin);
router.get('/api/getAllAccounts', authorizationMiddleware('admin'), getAllAccount)
router.post('/api/updateAccount', authorizationMiddleware('admin'), updateAccount)

router.get('/api/getConfiguration', getConfigurations);

//analytics
router.get('/api/getFacultyRankData', authorizationMiddleware('admin'), getFacultyRankData);
router.get('/api/getReRankingData', authorizationMiddleware('admin'), getReRankingData);
router.get('/api/getApprovedApplication', authorizationMiddleware('admin'), getApprovedApplications);

export default router
