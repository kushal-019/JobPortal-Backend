import express from "express";
import { testPostController } from "../controllers/testPostController.js";
import { homeController } from "../controllers/homeController.js";
import userAuth from "../middleware/authMiddlewaare.js";

const Testrouter = express.Router();

Testrouter.get('/' , homeController)
Testrouter.post("/testpost" ,userAuth ,testPostController);

export default Testrouter;