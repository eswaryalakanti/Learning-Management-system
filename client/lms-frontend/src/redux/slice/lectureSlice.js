import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../config/AxiosInstance"

const initialstate={
    lectures:[]
}

export const getalllectures=createAsyncThunk('/course/lectures',async(cid)=>{
  
    try {
        const response=axiosInstance.get(`courses/${cid}`);
        toast.promise(response, {
          loading: "Loading the lectures.",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to get lectures",
        });
    
        return await response;
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }

})


export const addlecture=createAsyncThunk('/course/lectures/create',async(cid,data)=>{
  
    try {
        const formData=new FormData()
        formData.append('title',data.title);
        formData.append('description',data.description);
        formData.append('lecture',data.lecture);
        const response=axiosInstance.post(`courses/${cid}`,formData);
        toast.promise(response, {
          loading: "creating a lecture",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to create a lecture",
        });
    
        return await response;
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }

})

export const deletelecture=createAsyncThunk('/course/lectures/create',async(cid,lid)=>{
  
    try {
        const response=axiosInstance.post(`courses?courseId=${cid} && lectureId=${lid}`,formData);
        toast.promise(response, {
          loading: "creating a lecture",
          success: (data) => {
            return data?.data?.message;
          },
          error: "Failed to create a lecture",
        });
    
        return await response;
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }

})


const lectureslice=createSlice(
{
    name:'lectures',
    initialState:initialstate,
    reducers:{},
    extraReducers:
        (builder)=>{
           
        builder.addCase(getalllectures.fulfilled,(state,action)=>{
            state.lectures=action?.payload?.data?.data;
        })
    }
}
);

export default lectureslice.reducer;