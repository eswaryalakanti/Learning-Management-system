import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../config/AxiosInstance";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const initialState = {
  isloggedin: localStorage.getItem("isloggedin") || false,
  token:'',
  role: localStorage.getItem("role") || "",//changed
  auth_data: JSON.parse( JSON.stringify(localStorage.getItem("auth_data")) )|| {},
};

export const createuser = createAsyncThunk("auth/signup", async (data) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    const response = axiosInstance.post("user/register", formData);
    toast.promise(response, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create your account",
    });
    const { token, cookieOptions } = (await response).data;

    
    if (token) {
        const { secure, expires, httpOnly, sameSite } = cookieOptions;
        const expiresDate = new Date(expires);
        Cookies.set("token", token, {
          secure: secure,
          expires: expiresDate,
        });
        localStorage.setItem('token',token);
    }
    return await response;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

export const loginuser = createAsyncThunk("auth/login", async (data) => {
  try {
    console.log(data);
    const response = axiosInstance.post("user/login", data);
    toast.promise(response, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create your account",
    });
    const { token, cookieOptions } = (await response).data;
    // console.log(token, cookieOptions);
    
    if (token) {
        const { secure, expires, httpOnly, sameSite } = cookieOptions;
        const expiresDate = new Date(expires);
        Cookies.set("token", token, {
          secure: secure,
          expires: expiresDate,
        });
        localStorage.setItem('token',token);
        console.log();
        
    }
    return await response;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});


export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (email) => {
    try {
     
      const response = axiosInstance.post('/user/reset', { email });
      toast.promise(response, {
        loading: "Wait! creating your account",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to create your account",
      });
      return await response.data.message || 'Reset email sent!';
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);




export const updatepasssword=createAsyncThunk('/auth/updatepassword',async(data)=>{
  try{
    const response=axiosInstance.post('/user/update-password',data);
    toast.promise(response, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create your account",
    });
   return await response;
  }
  catch(error){
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
})



export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, password, token }) => {
    try {
      console.log(token);
      
      const response = axiosInstance.post(`/user/reset/${token}`, {
        email,
        password,
      });
      toast.promise(response, {
        loading: "Wait! creating your account",
        success: (data) => {
          return data?.data?.message;
        },
        error: "Failed to create your account",
      });
      return await response;
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  }
);


export const editprofile = createAsyncThunk("auth/editprofile", async (data) => {
  try {
    console.log('the dat is:',data);
    const response = axiosInstance.post("/user/updateprofile", data);
    console.log(await response);
    
    toast.promise(response, {
      loading: "Wait! creating your account",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to create your account",
    });
    const { token, cookieOptions } = (await response).data;
    // console.log(token, cookieOptions);
    
    if (token) {
        const { secure, expires, httpOnly, sameSite } = cookieOptions;
        const expiresDate = new Date(expires);
        Cookies.set("token", token, {
          secure: secure,
          expires: expiresDate,
        });
        localStorage.setItem('token',token);
    }
    return await response;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});



export const getuser = createAsyncThunk("auth/me", async (data) => {
  try {
    console.log(data);
    const response = axiosInstance.get("user/me");
  
    return await response;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});




export const logoutuser = createAsyncThunk("auth/logout", async () => {
  try {
    const response = axiosInstance.get("user/logout");
    toast.promise(response, {
      loading: "Logging Out ......",
      success: (data) => {
        return data?.data?.message;
      },
      error: "Failed to Log Out",
    });

    return await response;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message);
  }
});

const authslice = createSlice({
  name: "auth", // The name of the slice
  initialState, // Initial state of the slice
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createuser.fulfilled,(state,action)=>{
        const role = action?.payload?.data?.data?.role; 
        localStorage.setItem("auth_data", JSON.stringify(action?.payload?.data));
        localStorage.setItem("isloggedin", true);
        localStorage.setItem("role", action?.payload?.data?.data?.role);
        console.log("the user is:");
        console.log(action?.payload?.data?.data?.role);
        state.isloggedin = true;
        state.role =  role;
        console.log('the stte:');
        console.log(state);
        console.log( action?.payload?.data?.data?.role);
        
        
        state.auth_data = action?.payload?.data;
      })
      .addCase(loginuser.fulfilled, (state, action) => {
        const role = action?.payload?.data?.data?.role; 
        console.log(action?.payload?.data);
        
        localStorage.setItem("auth_data", JSON.stringify(action?.payload?.data));
        localStorage.setItem("isloggedin", true);
        localStorage.setItem("role", action?.payload?.data?.data?.role);
        console.log("the user is:");
        console.log(action?.payload?.data?.data?.role);
        state.isloggedin = true;
        state.role =  role;
        console.log('the stte:');
        console.log(state);
        console.log( action?.payload?.data?.data?.role);
        
        
        state.auth_data = action?.payload?.data;

        
      })
      .addCase(getuser.fulfilled,(state,action)=>{
   if(action?.payload?.data?.data){
    const role=action?.payload?.data?.data?.role;
    console.log('hiii',action?.payload?.data);
    state.isloggedin = true;
    state.role =  role;

    
    
    state.auth_data = action?.payload?.data;
    localStorage.setItem("auth_data", JSON.stringify(action?.payload?.data));
    localStorage.setItem("isloggedin", true);
    localStorage.setItem("role", action?.payload?.data?.data?.role); 
   }else{
    return ;
   }
   
      })
      .addCase(logoutuser.fulfilled, (state) => {
        state.isloggedin = false;
        state.role = "";
        state.auth_data = {};
        localStorage.clear();
      });
  },
});

export default authslice.reducer;
