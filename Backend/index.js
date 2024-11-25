import express from 'express'
import dotenv from "dotenv";
import connectDB from './Config/Database.config.js';

import 'express-async-errors';
import cors from "cors"
import morgan from 'morgan';

// Security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";



import Testrouter from './routes/testRoute.js';
import Authrouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';

import errorMiddleWare from './middleware/errorMiddleWare.js';
import JobRouter from './routes/jobRoute.js';


const app = express();

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());


app.use(express.json());
app.use(cors()) 
app.use(morgan('dev')); 

dotenv.config();

app.use(errorMiddleWare);

app.use("/api/v1/test" , Testrouter);
app.use("/api/v1/auth" , Authrouter);
app.use("/api/v1/user" , userRouter);
app.use("/api/v1/job" , JobRouter);
connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT , ()=>{
    console.log("App Running");
});