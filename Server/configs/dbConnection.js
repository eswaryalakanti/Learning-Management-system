// const mongoose=require('mongoose');
import mongoose from 'mongoose';



mongoose.set('strictQuery',false);// saying that dont throw error if any msall things are missing
const connectdb=async ()=>{
    try{
        const {connection}=await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase');

        if(connection){
            console.log(`database connected ${connection.host}`);
            console.log("object")
        }
    }catch(err){
             console.log(err.message);
    }
}


export default connectdb;

// module.exports=connectdb;