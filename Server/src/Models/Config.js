import mongoose from 'mongoose';
const { Schema } = mongoose;

const reRankingStatus = new Schema({
    isReRankingSet: {
        type: Boolean,
        default: false
    },
    isReRankingOpen: {
        type: Boolean,
        default: false
    },
    startDate: {
        type: Date,
        default: ''
    },
    endDate: {
        type: Date,
        default: ''
    }
})

const ConfigSchema = new Schema ({
    academicYear: String,
    reRankingStatus: reRankingStatus,
})

const ConfigModel = mongoose.model('configurations', ConfigSchema)

export default ConfigModel;