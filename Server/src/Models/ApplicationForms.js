import mongoose from 'mongoose';
const { Schema } = mongoose;

const filesSchema = new Schema({
    filePath: {
        type: String,
        default: null
    },
    fileName: {
        type: String,
        default: null
    }
})

const requirementSchema = new Schema({
    requirementNumber: {
        type: Number,
        default: null
    },
    files: [filesSchema]
})

const ApplicationFormsSchema = new Schema({
    name: String,
    email: String,
    college: String,
    department: String,
    currentRank: String,
    userStatus: String,
    academicYear: String,
    applyingFor: String,
    track: String,
    requirements: [requirementSchema],
    prevApprover: {
        type: String,
        default: null
    },
    currentApprover: {
        type: String,
        default: null
    },
    applicationStatus: { 
        type: String,
        default: 'For verification'
    },
    date_submitted: {
        type: Date,
        default: Date.now()
    }
})

const ApplicationForm = mongoose.model('applicationForms', ApplicationFormsSchema);

export default ApplicationForm;