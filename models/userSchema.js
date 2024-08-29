import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "name is required"],
    },
    lastname : {
        type : String,
    },
    email : {
        type : String,
        required : [true, "name is required"],
        unique : true,
        validator : validator.isEmail,
    },
    password : {
        type : String,
        required : [true, "name is required"],
        minlength : [6 , "Minimum 6 digit expected"]
    },
    location : {
        type : String,
        default : "India",
    }
},
    {timestamps : true}
)

export default mongoose.model("User" , userSchema);