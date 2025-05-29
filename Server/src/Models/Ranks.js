import mongoose, { mongo } from 'mongoose';
const { Schema } = mongoose;

const RequirementSchema = new Schema({
    requirementNumber: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requiredDocument: {
        type: [mongoose.Schema.Types.Mixed],
        default: []
    }
});

const RankSchema = new Schema({
    rankName: {
        type: String,
        required: true
    },
    track: {
        type: String,
        required: true
    },
    requirements: [RequirementSchema]  // Array of requirements for this rank
});

const RankModel = mongoose.model('rank', RankSchema)

export default RankModel;