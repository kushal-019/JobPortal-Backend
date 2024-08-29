import express from 'express'
import dotenv from "dotenv";
import connectDB from './Config/Database.config.js';
import cors from "cors"
import morgan from 'morgan';

import Testrouter from './routes/testRoute.js';
import Authrouter from './routes/authRoute.js';
const app = express();

app.use(express.json());
app.use(cors()) 
app.use(morgan('dev')); 

dotenv.config();

app.use("/api/v1/test" , Testrouter);
app.use("/api/v1/auth" , Authrouter);
connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT , ()=>{
    console.log("App Running");
});