import express from 'express'
import userAuth from '../middleware/authMiddlewaare.js';
import { createJobController } from '../controllers/jobController.js';
import { getAllJobController } from '../controllers/jobController.js';

const JobRouter = express.Router();

JobRouter.post("/create-job" , userAuth ,createJobController )
JobRouter.get("/get-job" , userAuth ,getAllJobController )

export default JobRouter;