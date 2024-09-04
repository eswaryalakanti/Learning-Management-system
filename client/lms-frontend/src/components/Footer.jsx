import React from 'react'
import { FaFacebook,FaInstagram ,FaTwitter,FaGithub,FaLinkedin } from "react-icons/fa";

function Footer() {
    const date=new Date();
    const year=date.getFullYear();
  return (
    <footer className='relative left-0 bottom-0 h-[14vh] py-5 sm:gap-0  flex flex-col sm:flex-row sm:px-20 items-center justify-between text-white bg-gray-500'>
   <section>copyright {year} || copyright all preserved</section>
   <section className='flex justify-center items-start gap-5 text-white text-3xl'>
    <a href='#' className=' text-white  hover:cursor-pointer hover:-translate-y-1 hover:scale-110 hover:text-3xl  transition delay-150 duration-300 ease-in-out'>
        <FaFacebook />
    </a>
    <a href='#' className=' text-white hover:-translate-y-1 hover:scale-110 hover:text-3xl  transition delay-150 duration-300 ease-in-out'>
        <FaGithub/>
    </a>
    <a href='#' className=' text-white hover:-translate-y-1 hover:scale-110 hover:text-3xl  transition delay-150 duration-300 ease-in-out'>
        <FaInstagram/>
    </a>
    <a href='#' className=' text-white hover:-translate-y-1 hover:scale-110 hover:text-3xl  transition delay-150 duration-300 ease-in-out'>
        <FaLinkedin/>
    </a>
    <a href='#' className=' text-white hover:-translate-y-1 hover:scale-110 hover:text-3xl  transition delay-150 duration-300 ease-in-out'>
        <FaTwitter/>
    </a>
   </section>
    </footer>
  )
}

export default Footer
