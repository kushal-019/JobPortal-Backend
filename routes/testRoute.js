import express from "express";
import { testPostController } from "../controllers/testPostController.js";
import { homeController } from "../controllers/homeController.js";

const Testrouter = express.Router();

Testrouter.get('/' , homeController)
Testrouter.post("/testpost" , testPostController);

export default Testrouter;