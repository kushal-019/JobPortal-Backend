import express from "express";
import { registerController } from '../controllers/registerController.js';
import { loginController } from "../controllers/loginController.js";
import { rateLimit } from 'express-rate-limit'



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 100, 
    standardHeaders: 'draft-7', 
    legacyHeaders: false, 
})


const Authrouter = express.Router();

Authrouter.post("/register" , limiter , registerController)

Authrouter.post("/login" ,limiter , loginController)

export default Authrouter;