
const errorMiddleWare=(err, req,res ,next)=>{
    console.log(err);
    const defaultError  = {
        success : false,
        message : err ,
        statusCode : 500,
    };
    if(err.name === 'ValidationError'  ){
        defaultError.statusCode = 400,
        defaultError.message = Object.values(err.errors).map((item)=> item.message).join(",");
    }
    if(err && err.code === 11000 ){
        defaultError.statusCode = 400,
        defaultError.message = `${Object.keys(err.keyValue)} field has to be unique`;
    }

    res.status(defaultError.statusCode).send(defaultError.message);
};

export default errorMiddleWare;