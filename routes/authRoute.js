import express from "express";
import { registerController } from '../controllers/registerController.js';

const Authrouter = express.Router();

Authrouter.post("/register" , registerController)

export default Authrouter;