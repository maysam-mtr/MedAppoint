import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo1.png';

const quickLinks1 = [
  {
    path: "/",
    display:"Home"
  },
  {
    path:'/',
    display:'About Us'
  },
  {
    path:'/services',
    display:'Services'
  },
  {
    path:'/',
    display:'Blog'
  },
];
const quickLinks2 = [
  {
    path: "/doctors",
    display:"Find a Doctor"
  },
  {
    path:'/doctors',
    display:'Request an Appointment'
  },
  {
    path:'/doctors',
    display:'Get a Opinion'
  },
];
const quickLinks3 = [
  {
    path: "/",
    display:"Donate"
  },
  {
    path:'/contact',
    display:'Contact Us'
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='pb-16 pt-10 bg-primaryColor'>
      <div className='container'>
        <div className='flex flex-col justify-between  md:flex-row flex-wrap gap-[30px]'>
          
          <div>
            
            <div className='flex items-center'>
              <img src={logo} alt="logo" className="w-[80px] h-auto"/>
              <span className="ml-2 text-[18px] font-bold hidden md:inline text-white">MedAppoint</span>
            </div>
            <p className='text-[16px] leading-7 font-[400] text-white mt-4'>Copyright © {year} developed by Maysam, all rights reserved.</p>

            <div className='flex items-center gap-3 mt-4'>
              <i class="fa-brands fa-github w-9 h-9 border border-solid border-white rounded-full flex items-center justify-center 
                group hover:bg-white hover:border-none hover:text-irisBlueColor text-white"></i>
              <i class="fa-brands fa-x-twitter w-9 h-9 border border-solid border-white rounded-full flex items-center justify-center 
                group hover:bg-white hover:border-none hover:text-irisBlueColor text-white"></i>
              <i class="fa-brands fa-linkedin w-9 h-9 border border-solid border-white rounded-full flex items-center justify-center 
                group hover:bg-white hover:border-none hover:text-irisBlueColor text-white"></i>
            </div>
          </div>

          <div>
            <h className='text-[20px] leading-[30px] font-[700] mb-6 text-white'> Quick Links </h>
            <ul className='mt-3'>
              {quickLinks1.map((link, index) =>
                <li 
                key={index} 
                className='mb-4 text-white'><Link to={link.path} >{link.display}</Link>
                </li>)}
            </ul>
          </div>

          <div>
            <h className='text-[20px] leading-[30px] font-[700] mb-6 text-white'> I want to: </h>
            <ul className='mt-3'>
              {quickLinks2.map((link, index) =>
                <li 
                key={index} 
                className='mb-4 text-white'><Link to={link.path} >{link.display}</Link>
                </li>)}
            </ul>
          </div>

          <div>
            <h className='text-[20px] leading-[30px] font-[700] mb-6 text-white'> Support </h>
            <ul className='mt-3'>
              {quickLinks3.map((link, index) =>
                <li 
                key={index} 
                className='mb-4 text-white'><Link to={link.path} >{link.display}</Link>
                </li>)}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
