import userSchema from "../models/userSchema.js";

export const registerController=async(req,res)=>{
    try{
        const {name , email, password} = req.body;
        if(!name)return res.status(400).send({success : false , message : "please provide name"});

        if(!email)return res.status(400).send({success : false , message : "please provide email"});

        if(!password)return res.status(400).send({success : false , message : "please provide password"});

        const existingUser = await userSchema.findOne({email});
        if(existingUser)return res.status(400).send({success : false , message:"User already exists"});

        const user = await userSchema.create({name , email ,password});

         res.status(201).send({success : true , message:"User created successfully" , user});

    }
    catch(error){
        console.log(error);
        res.status(400).send({
            message : "Error in registeration",
            success : false,
            error
        })
    }
};