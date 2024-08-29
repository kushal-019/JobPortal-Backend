import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

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
        minlength : [6 , "Minimum 6 digit expected"],
        select : true,
    },
    location : {
        type : String,
        default : "India",
    }
},
    {timestamps : true}
)
userSchema.pre("save" , async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
});
userSchema.methods.comparePassword = async function(userPassword){
    const matched = await bcrypt.compare(userPassword , this.password );

    return matched;
}
userSchema.methods.createJWT = function (){
    return JWT.sign({userId : this._id } , process.env.JWTTOKEN , {expiresIn : '1d'});
}
export default mongoose.model("User" , userSchema);