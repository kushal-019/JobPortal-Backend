import userSchema from "../models/userSchema.js";

export const registerController=async(req,res ,next)=>{
    try{
        const {name , email, password} = req.body;
        if(!name)next("please provide name");

        if(!email)next("please provide email");

        if(!password) next("please provide password");

        const existingUser = await userSchema.findOne({email});
        if(existingUser)next("User already exists");
        const user = await userSchema.create({name , email ,password});

        const token = user.createJWT();

         res.status(201).send({success : true , message:"User created successfully" , user:{
            name : user.name,
            lastname : user.lastname,
            email : user.email,
            location : user.location,
         },
         token,
        });

    }
    catch(error){
        next(error);
    }
};