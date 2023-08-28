import mongoose from 'mongoose'
const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Company name is required'],
    },
    position: {
        type: String,
        required: [true, 'Job position is requierd'],
        minLength: 100
    },
    status: {
        type: String,

    }
})
export default mongoose.model('Job', jobSchema)