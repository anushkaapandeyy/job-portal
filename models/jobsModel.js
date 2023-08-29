import mongoose from 'mongoose'
const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required'],
    },
    position: {
        type: String,
        required: [true, 'Job position is requierd'],
        maxLength: 100
    },
    status: {
        type: String,
        enum: ['pending', 'reject', 'interview'],
        default: 'pending'
    },
    workType: {
        type: String,
        enum: ['full-time', 'part-time', 'internship', 'contract-based-job'],
        default: 'full-time'
    },
    worklocation: {
        type: String,
        default: 'Chennai',
        required: [true, ' work location is required']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export default mongoose.model('Job', jobSchema)