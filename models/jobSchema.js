import mongoose from "mongoose";

const jobSchema =new mongoose.Schema({
    company : {
        type : String,
        required : [true , "Company name is required"],
    },
    position : {
        type : String,
        required : [true , "Position name is required"],
        maxlength : 100,
    },
    status : {
        type : String,
        enum : ["pending" , "reject" , "interview"],
        default : "pending",
    },
    worktype : {
        type : String,
        enum : ["full-time" , "part-time" , "internship"],
        default : "full-time",
    },
    worklocation : {
        type : String,
        required : [true , "Work Location is required"],
        default : "Mumbai",
    },
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref: "User"
    }
} , {timestamps : true});

export default mongoose.model("Job" , jobSchema   
)