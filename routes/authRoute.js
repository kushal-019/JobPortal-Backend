import express from "express";
import { registerController } from '../controllers/registerController.js';
import { loginController } from "../controllers/loginController.js";

const Authrouter = express.Router();

Authrouter.post("/register" , registerController)

Authrouter.post("/login" , loginController)

export default Authrouter;