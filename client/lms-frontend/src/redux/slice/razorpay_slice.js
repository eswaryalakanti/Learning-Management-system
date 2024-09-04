import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/AxiosInstance";
import toast from "react-hot-toast";



const initialstate={
    key:'',
    subscriptionid:'',
    allpayments:{},
    ispaymentverified:false,
    allmonths:{},
    records:[]
}

export const getrazorpayid=createAsyncThunk('/razorpay/getid',async()=>{
    try{
        const response=await axiosInstance.get('payments/razorpaykey');
        return response;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})


export const purchasecourses=createAsyncThunk('/razorpay/subscribe',async()=>{
    try{
        const response=await axiosInstance.post('payments/subscribe');
        return response;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})

export const verifyrazorpaypayment=createAsyncThunk('/razorpay/verify',async(data)=>{
    try{
        const response=await axiosInstance.post('payments/verify',{
            razorpay_payment_id:data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        });
        return response;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})



export const getallpayments=createAsyncThunk('/razorpay/allpayments',async(data)=>{
    try{
        const response=await axiosInstance.get(`payments/allpayments?count=100`);
        toast.promise(response,{
            loading:'getting payments',
            success:'payments fetched',
            error:'error in fetching payments'
        })
        return response;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})


export const cancelsubscription=createAsyncThunk('/razorpay/unsubscribe',async(data)=>{
    try{
        const response= axiosInstance.post("payments/unsubscribe");
        console.log('the unsubscribe',await response);
        
        toast.promise(response,{
            loading:'getting in progress unscribe',
            success:(data) => {
                return data?.data?.message;
              },
            error:'error in unsubscribing'
        })
        return response;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
})



const razorpay_slice=createSlice({
    name:'razorpay',
    initialState:initialstate,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getrazorpayid.fulfilled,(state,action)=>{
                          state.key=action?.payload?.data.key;})
               .addCase(purchasecourses.fulfilled,(state,action)=>{
                       state.subscriptionid=action?.payload?.data?.data?.subscription?.id;
                       })
                .addCase(verifyrazorpaypayment.fulfilled,(state,action)=>{
                    toast.success(action?.payload?.data?.message);
                    state.ispaymentverified=action?.payload?.data?.success;
                })
                .addCase(verifyrazorpaypayment.rejected,(state,action)=>{
                    console.log('rejected');
                    state.ispaymentverified=action?.payload?.data?.success;
                    toast.error(action?.payload?.data?.message)
                    
                })
                .addCase(getallpayments.fulfilled,(state,action)=>{
                    state.allpayments=action?.payload?.data?.allpayments;
                    state.allmonths=action?.payload?.data?.finalMonths;
                    state.records=action?.payload?.data?.monthlySalesRecord;
                })

    }
});

export default razorpay_slice.reducer;