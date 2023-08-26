//imports modulejs
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";


//files import
import connectDB from "./config/db.js";

//routes import
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

//config dotenv
dotenv.config();

//mongodb connection
connectDB();

//rest obj
const app = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

//routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
//validation middleare
app.use(errorMiddleware);

//port extract from dotenv
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`server listening at ${process.env.DEV_MODE}`.bgCyan.white)
});
