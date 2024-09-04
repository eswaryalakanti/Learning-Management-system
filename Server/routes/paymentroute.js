import { Router } from "express";
import { isloggedin,authorizeduser,authorizedsubscription } from "../middleware/authMiddleware.js";
import { getRazorpayapikey,subscription,verifypayment,cancelsubscription,getallpayments} from "../controllers/paymentController.js";
const router=Router();

router.route('/razorpaykey').get(isloggedin,getRazorpayapikey);
router.route('/subscribe').post(isloggedin,subscription);
router.route('/verify').post(isloggedin,verifypayment);
router.route('/unsubscribe').post(isloggedin,cancelsubscription);
router.route('/allpayments').get(isloggedin,()=>{authorizeduser('ADMIN')},getallpayments);

export default router;
        