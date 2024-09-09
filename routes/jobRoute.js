import express from 'express'
import userAuth from '../middleware/authMiddlewaare.js';
import { createJobController ,updateJobController ,getAllJobController , deleteJobController} from '../controllers/jobController.js';


const JobRouter = express.Router();

JobRouter.post("/create-job" , userAuth ,createJobController )
JobRouter.get("/get-job" , userAuth ,getAllJobController )
JobRouter.patch("/update-job/:id" , userAuth , updateJobController)
JobRouter.delete("/delete-job/:id" , userAuth , deleteJobController)

export default JobRouter;