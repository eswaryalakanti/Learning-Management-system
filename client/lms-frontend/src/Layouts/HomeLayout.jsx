 import React, { Children, useEffect, useState } from 'react';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { ListItem } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import GroupIcon from '@mui/icons-material/Group';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { logoutuser } from '../redux/slice/authslice';


export default function HomeLayout({children}) {
  const [open, setOpen] = React.useState(false);
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const isloggedin=useSelector((state)=>state?.auth?.isloggedin);
  const role=useSelector((state)=>state?.auth?.role);
  const ondelete=async function(e){
    e.preventDefault();

    const re=await dispatch(logoutuser());
    console.log('usrrs:')
    console.log(re)
    if(re?.payload?.data?.success){
      navigate('/');
    }
0

  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} className=' bg-gray-400 h-full m-0 p-0 box'  role="presentation"  onClick={toggleDrawer(false)} >
      <List className='m-0 p-0 text-white '>

      <ListItem  disablePadding onClick={toggleDrawer(false)}>
            <ListItemButton>
              <ListItemIcon>
                <CloseIcon/>
              </ListItemIcon>
              <ListItemText primary={'Close'} />
            </ListItemButton>
          </ListItem>
      
      <Link to='/'>
         <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                 <HomeIcon/>
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
      
      </Link>

      <Link to='/aboutus'>
         <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupIcon/>
              </ListItemIcon>
              <ListItemText primary={'About Us'} />
            </ListItemButton>
          </ListItem>
      
      </Link>
      <Link to='/courses'>
         <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                 <AutoStoriesIcon/>
              </ListItemIcon>
              <ListItemText primary={'Courses'} />
            </ListItemButton>
          </ListItem>
      
      </Link>
      <Link to='/contactus'>
         <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SupportAgentIcon/>
              </ListItemIcon>
              <ListItemText primary={'Contact Us'} />
            </ListItemButton>
          </ListItem>
      
      </Link>

      {isloggedin && role=='ADMIN' && (<Link to='/course/create'>
         <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                
              </ListItemIcon>
              <ListItemText primary={'Create Course'} />
            </ListItemButton>
          </ListItem>
      
      </Link>)}
      
      {isloggedin && role=='ADMIN' && (<Link to='/admindashboard'>
         <ListItem  disablePadding>
            <ListItemButton>
              <ListItemIcon>
                
              </ListItemIcon>
              <ListItemText primary={'Admin Dashboard'} />
            </ListItemButton>
          </ListItem>
      
      </Link>)}

 {!isloggedin ?(<ListItem disablePadding >
                              <button className='w-[45%] m-[1%]  text-[1.3rem] text-black hover:bg-[#3847ba] rounded-md active:bg-[#3847ba] bg-blue-700 font-semibold flex align-center justify-center'>
                                 <Link to='/login'>
                                 Log In
                                 </Link>
                              </button>
                              <button className='w-[45%] p-0 m-[1%] text-[1.3rem] hover:bg-[#e491e0] rounded-md active:bg-[#e597e2] text-black bg-[#dd52d6] font-semibold flex align-center justify-center'>
                                 <Link to='/signup'>
                                 Sign In
                                 </Link> 
                              </button>
                       </ListItem>):
                          (<ListItem disablePadding>
                              <button className='w-[45%] m-[1%]  text-[1.3rem] text-black hover:bg-[#3847ba] rounded-md active:bg-[#3847ba] bg-blue-700 font-semibold flex align-center justify-center'>
                              <Link to='/login' onClick={ondelete}>
                                 Log Out
                                 </Link> 
                              </button>
                              <button className='w-[45%] p-0 m-[1%] text-[1.3rem] hover:bg-[#e491e0] rounded-md active:bg-[#e597e2] text-black bg-[#dd52d6] font-semibold flex align-center justify-center'>
                              <Link to='/user/profile'>
                                 Profile
                                 </Link> 
                              </button>
                         </ListItem>)}        
      </List>
    </Box>
  );

  return (
    <div className='bg-black absolute w-full'>
      <Button onClick={toggleDrawer(true)}><MenuIcon fontSize='large' /></Button>
      <Drawer open={open} onClose={toggleDrawer(false)} className='h-full'>
        {DrawerList}
      </Drawer>
      {children}
      <Footer/>
    </div>
  );
}


