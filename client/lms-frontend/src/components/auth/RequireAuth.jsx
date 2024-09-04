import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';
import DeniedPage from '../../Pages/Denied';

function RequireAuth({reqroles}) {
    
    const {isloggedin,role}=useSelector((state)=>state.auth);
     console.log( isloggedin,role,reqroles,reqroles.includes(role));

     
    return (<>
    {isloggedin && reqroles.includes(role)?( <Outlet/>):isloggedin?(<DeniedPage/>):(<Navigate to='/login'/>)}
    </>);
  
    
}

export default RequireAuth