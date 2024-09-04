// const app=require('./app');
import app from './app.js';
import { v2 as cloudinary } from 'cloudinary';
import connectdb  from './configs/dbConnection.js';
import denv from 'dotenv';
import Razorpay from 'razorpay';

denv.config()

const PORT =process.env.PORT || 5000



cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_APIKEY, 
        api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
    
export const  razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
app.listen(PORT,async ()=>{
    await connectdb();
    console.log(process.env.FROTEND_URL);
 console.log(`The server is running on https://localhost:${PORT}`)
});