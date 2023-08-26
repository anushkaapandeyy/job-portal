import mongoose from "mongoose";

//schmea
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, "EMail needed"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password needed"]
    },
    location: {
        type: String,
        default: "india"
    }
}, { timestamps: true });

export default mongoose.model('User', userSchema)