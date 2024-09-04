// const { stack } = require("../app");
// import stack from '../app.js';


const errormiddleware=function(error,req,res,next){
    req.statusCode=req.statusCode || 500;
    req.message=req.message || "something went wrong";

    res.status(req.statusCode).send({error:req.message,success:false,stack:error.stack});
}

export default errormiddleware

// module.exports=errormiddleware;