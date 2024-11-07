
export const testPostController=(req , res)=>{
    const {name} = req.body;
    // console.log(req.body);
    // res.status(200).send("success");
    res.status(200).send(`name : ${name}`);
}   
