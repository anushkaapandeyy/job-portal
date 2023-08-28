import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import validator from "validator";
//schmea
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "EMail needed"],
        unique: true,
        validate: validator.isEmail,
    },
    password: {
        type: String,
        required: [true, "password needed"],
        minlength: [6, "password length should be > 6"],
        select: true,
    },
    location: {
        type: String,
        default: "india",
    },
}, { timestamps: true });
//middleware
userSchema.pre('save', async function () {
    if (!this.isModified) return
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
//compare password
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
};

//JSON WEBTOKEN
userSchema.methods.createJWT = function () {
    return JWT.sign({ userId: this._id }
        , process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

};
export default mongoose.model('User', userSchema)