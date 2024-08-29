import userSchema from "../models/userSchema.js";

export const loginController=async(req,res ,next)=>{
    const {email , password} = req.body;
    if(!email || !password) next("please provide all fields");

    const user =  await userSchema.findOne({email}).select("+password");
    if(!user)next("Invalid username or password");
    
    const matched = await user.comparePassword(password);
    
    if(!matched)next("Invalid username or password");
    user.password = undefined;
    const token = user.createJWT();

    res.status(200).json({
        success :true,
        message : "Login SuccessFull",
        user,
        token,
    });

}   