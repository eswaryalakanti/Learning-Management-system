import React from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import { Link } from 'react-router-dom';
import homePageMainImage from '../assets/Images/homePageMainImage.png';

function Home() {
  return (
    <HomeLayout>
        <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16 h-[86vh]">
                <div className="md:w-1/2 space-y-6 w-full ">
                    <h1 className="text-5xl font-semibold">Find out best <span className="text-yellow-500 font-bold">Online courses</span></h1>
                    <p className="text-xl text-gray-200">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cose.
                    </p>
                    <div className='md-flex-row flex-col w-[100%] md:w-auto'>
                      
                        <Link to="/courses" className="bg-yellow-500 rounded-md p-4 hover:bg-yellow-700 text-white">
                        <button className=''>
                        <span className="text-lg font-bold">Explore Courses</span>
                        </button>
                        
                        </Link>
                        <Link to="/contactus" className="bg-yellow-500 rounded-md p-4 hover:bg-yellow-700 text-white ml-2">
                        <button className=''>
                        <span className="text-lg font-bold">Contact us</span>
                        </button>
                        
                        </Link>
                    </div>
                    
                </div>
                
                       <div className='w-1/2 space-y-6 md:block hidden'>
                       <img src={homePageMainImage} alt='ecerc'/>

                       </div>
            </div>
    </HomeLayout>
        
  );
}

export default Home;