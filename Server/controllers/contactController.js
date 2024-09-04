import AppError from "../utils/Apperror.js";
import contact from '../models/contact.model.js'


const createcontact=async function(req,res,next){
try{
    console.log("contacts")
    const contacts=new contact(req.body);
    await contacts.save();
    console.log("object")
    return res.status(200).json({success:true,
        data:contacts,
        message:"query sent successfully",
    });
}
catch(error){
    console.log(error);
    return next(new AppError('Courses not found',400));
    
}


}

export {createcontact};