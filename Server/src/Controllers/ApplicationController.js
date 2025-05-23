import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import Account from '../Models/Account.js';
import ApplicationForms from '../Models/ApplicationForms.js';
import { sendApplicationResponse, sendEmailVerification } from '../Helpers/SendEmail.js';
import { compareHashed } from '../Helpers/Auth.js'
 
export const submitApplicationEntry = async (req, res) => {
    const { token } = req.cookies;
    const { name, college, department, currentRank, status, academicYear, ApplyingFor, userTrack, requirements } = req.body;


    if(!name || !college || !department || !currentRank || !academicYear || !ApplyingFor || !userTrack) {
        return res.json({ error: 'Required all fields.'})
    }

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);

        await ApplicationForms.create({
            name: name,
            email: email,
            college: college,
            department: department,
            currentRank: currentRank,
            userStatus: status,
            academicYear: academicYear,
            applyingFor: ApplyingFor,
            track: userTrack,
            requirements: requirements,
        });
        
        return res.json({ message: 'Application submitted successfully!'});

    } catch (error) {
        console.log( error );
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const checkExistingEntry = async (req, res) => {
    const { token } = req.cookies;

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userEntry = await ApplicationForms.findOne({ email: email, applicationStatus: 'For verification' });
        return res.json(userEntry)
        
    }
    catch (error) {
        console.error(`Fetching User Entry Error: ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const getApplicationsForReRanking = async (req, res) => {
    const { token } = req.cookies;
    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const userData = await Account.findOne({ email: email });
        console.log(userData.approverNumber)

        const approverLevel = userData.approverNumber === 1 ? null : userData.approverNumber - 1;
    
        const applications = await ApplicationForms.find({
            prevApprover: approverLevel,
            applicationStatus: 'For verification',
        });

        return res.status(200).json(applications)

    } catch (error) {
        console.error(`Fetching Applications Error: ${ error.message }`);
        return res.json({ error: 'An internal server error occurred.' });
    }
}

export const updateApplication = async (req, res) => {
    const { applicationID, requirements } = req.body;
    const { token } = req.cookies;

    if(!token) return res.json({ error: 'Access Denied' })
    
    try {
        await ApplicationForms.findByIdAndUpdate(applicationID, { requirements: requirements, applicationStatus: 'For verification' }, { new: true })
        return res.json({ message: 'Updated Successfully'})
    } catch (error) {
        console.log( error );
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const cancelSubmission = async (req, res) => {
    const { id } = req.body;

    try {
        const response = await ApplicationForms.findByIdAndDelete(id);

        if (!response) {
            return res.json({ 
                error: "We encountered a problem while cancelling your application. Please try again later! If the problem persists, contact us. Thank you." 
            });
        }
    
        return res.json({ message: 'You successfully cancelled your application.' });
    }

    catch(error) {
        console.log( error );
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}

export const submitApplicationReview = async (req, res) => {
    const { token } = req.cookies;
    const { formID, verdict, filterRemarks } = req.body;

    try {
        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        const [ userInfo, userApplicationForm ] = await Promise.all([
            Account.findOne({ email }),
            ApplicationForms.findById(formID)
        ]);
        
        console.log(filterRemarks)

        if (!userApplicationForm) {
            return res.json({ error: 'Application form not found.' });
        }

        userApplicationForm.applicationStatus = verdict;
        userApplicationForm.prevApprover = verdict === 'Approved' ? userInfo.approverNumber : null;

        await userApplicationForm.save();

        if(verdict === 'Approved') {
            await Account.updateOne({ email: userApplicationForm.email }, { 'accountinfo.0.rank': userApplicationForm.applyingFor });
        }

        let message = '';

        if (verdict === 'Declined') {
        message = `We regret to inform you that your application has been **declined**.\n\nRemarks:\n\n` + 
            filterRemarks.map(r => `**${r.requirementDes}**\n- ${r.comment}`).join('\n\n');
        } else if (verdict === 'Return') {
        message = `Your application has been **returned** due to the following remarks:\n\n` + 
            filterRemarks.map(r => `**${r.requirementDes}**\n- ${r.comment}`).join('\n\n');
        } else if (verdict === 'Approve') {
        message = `Congratulations! Your application has been **approved**.`;
        }

        sendApplicationResponse(userApplicationForm.email, userApplicationForm.name, userApplicationForm.applyingFor, message)
        return res.json({ message: 'Response succesfully submitted'})


    } catch (error) {
        console.error(`Checking Application Error ${ error.message }`);
        return res.json({ error: 'An internal error occurred. Please try again later!' });
    }
}


