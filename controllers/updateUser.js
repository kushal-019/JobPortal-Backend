import userSchema from "../models/userSchema.js";

export const updateUserController =async (req,res,next)=>{
    const {name, email ,lastname , location} = req.body;
    if(!name || !email || !location || !lastname){
        next('Provide All Info');
    }
    console.log(req)
    const user = await userSchema.findOne({_id : req.user.userId});
    if(!user)next("No user")
    user.name = name;
    user.lastname = lastname;
    user.location = location;
    user.email = email;

    await user.save();

    const token = user.createJWT();

    res.status(200).json({
        user,token,
    })
};  