
const errorMiddleWare=(er, req,res ,next)=>{
    console.log(err);
    res.status(500).send({
        success : false,
        message : "Something went wrong" ,
        err,
    });
};

export default errorMiddleWare;