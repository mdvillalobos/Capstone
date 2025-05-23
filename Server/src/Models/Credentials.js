import mongoose from 'mongoose';
const { Schema } = mongoose;

const FileSchema = new Schema({
    category: {
        type: String, 
        required: true,
    },
    type: {
        type: String, 
        default: null
    },
    filePath: {
        type: String, 
        required: true
    },
    fileName: {
        type: String,  
        required: true
    },
    metrics: {
        type: Number,
        default: null
    }, 
    tags: {
        type: [String],  
        required: true
    },
    date_uploaded: {
        type: Date, 
        default: Date.now()
    },
    isActive: {
        type: Boolean, 
        default: true
    }
   
});

const CredentialsSchema = new Schema({
    email: {
        type: String,
        unique: true,  // Email must be unique for each user
        required: true
    },
    files: [FileSchema],  // Array of documents uploaded by the user
});

const CredentialModel = mongoose.model('credentials', CredentialsSchema);

export default CredentialModel;
