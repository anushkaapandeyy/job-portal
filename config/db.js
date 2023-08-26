import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_Url)
        console.log(`connected to mongodb database ${mongoose.connection.host}`.bgMagenta.white);
    }
    catch (error) {
        console.log(`monogdb error${error}`.bgRed.white)
    }
};
export default connectDB;