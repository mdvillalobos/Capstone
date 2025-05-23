import mongoose from 'mongoose';
const { Schema } = mongoose;

const AccountInfoSchema = new Schema({
    firstName: String,
    lastName: String,
    middleName: String,
    contact: String,
    sex: String,
    status: String,
    track: String,
    rank: String,
    college: String,
    department: String,
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