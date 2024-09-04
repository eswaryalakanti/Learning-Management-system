import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/AxiosInstance";
import toast from "react-hot-toast";

const initialState = {
   courselist:[],
   totalPages: 1,
   currentPage: 1
};

export const getalllectures = createAsyncThunk("/courses/getallcourses", async ({ page }) => {
  try {
    const response = axiosInstance.get(`courses?page=${page}`);
    return await response;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

export const searchCourses = createAsyncThunk('/courses/search', async (query) => {
  try {
    console.log('query',query);
    
    const response = axiosInstance.get(`courses/search?query=${query}`);
    console.log('lll',await response);
    
    return await response;
  } catch (error) {
    console.error(error);
    toast.error('Failed to search courses');
  }
});

export const craetecourse = createAsyncThunk("/courses/create", async (data) => {
  try {
    let formData = new FormData();
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("category", data?.category);
    formData.append("createdBy", data?.createdBy);
    formData.append("thumbnail", data?.thumbnail);
    
    const response = axiosInstance.post("/courses", formData);//change
  
    toast.promise(response, {
        loading: 'Wait! Creating new course',
        success: (data) => {
           console.log(data);
           
            return data?.data?.message;
        },
        error: 'Failed to create course'
    });
    return await response;
} catch(error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
}
});





const  courseslice= createSlice({
  name: "course", // The name of the slice
  initialState, // Initial state of the slice
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(getalllectures.fulfilled,(state,action)=>{
        // state.courselist=[...state.courselist,action.payload.data.data];
        state.courselist=action?.payload?.data?.data;
        state.totalPages = action?.payload?.data?.totalPages; // Update totalPages
        state.currentPage = action?.payload?.data?.currentPage;
    })
    .addCase(craetecourse.fulfilled,(state,action)=>{
      state.courselist=[...state.courselist,action?.payload?.data?.data];
    })
    .addCase(searchCourses.fulfilled, (state, action) => {
      state.courselist = action?.payload?.data?.data;
    });
  }
});

export default courseslice.reducer;
