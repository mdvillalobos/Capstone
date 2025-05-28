import mongoose from 'mongoose';
const { Schema } = mongoose;

const AccountInfoSchema = new Schema({
    firstName: {
        type: String,
        default: null
    },
    lastName: {
        type: String,
        default: null
    },
    middleName: {
        type: String,
        default: null
    },
    contact: {
        type: String,
        default: null
    },
    sex: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: null
    },
    track: {
        type: String,
        default: null
    },
    rank: {
        type: String,
        default: null
    },
    college: {
        type: String,
        default: null
    },
    department: {
        type: String,
        default: null
    },
    profilePicture: {
        type: String,
        default: null
    },
})

const AccountSchema = new Schema ({
    employeeID: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    approverNumber: {
        type: Number,
        default: null,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type:Boolean,
        default: true
    },
    created_At: {
        type: Date,
        default: Date.now()
    },
    accountinfo: [AccountInfoSchema]
})

const AccountModel = mongoose.model('accounts', AccountSchema)

export default AccountModel;