import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotificationSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    message: String,
    date: {
        type: Date,
        default: Date.now()
    },
    isView: {
        type: Boolean,
        default: false
    } 
})

const NotificationModel = mongoose.model('notifications', NotificationSchema);

export default NotificationModel;
