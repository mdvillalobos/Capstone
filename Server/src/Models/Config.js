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
        default: null
    },
    endDate: {
        type: Date,
        default: null
    }
})

const ConfigSchema = new Schema ({
    academicYear: String,
    reRankingPage: reRankingStatus,
})

const ConfigModel = mongoose.model('configurations', ConfigSchema)

export default ConfigModel;