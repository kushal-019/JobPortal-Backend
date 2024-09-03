import jobSchema from "../models/jobSchema.js";

export const createJobController =async(req,res,next)=>{
    const {position , company } =req.body;

    if(!company || !position){
        next("please provide complete details")
    }

    req.body.createdBy = req.user.userId;
    const job = await jobSchema.create(req.body);
    res.status(201).json({job});

};

export const getAllJobController=async(req,res,next)=>{
    const jobs =await jobSchema.find({createdBy : req.user.userId})
    

    res.status(200).json({
        totalJobs : jobs.length,
        jobs
    })
}