import {React, useEffect, useRef, useContext} from 'react'
import logo from '../assets/images/logo1.png'
import userIcon from '../assets/images/userImg.png'
import {NavLink, Link} from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const navLinks = [
  {
    path:'/home',
    display: 'Home'
  },
  {
    path:'/doctors',
    display: 'Find a Doctor'
  },
  {
    path:'/services',
    display: 'Services'
  },
  {
    path:'/contact',
    display: 'Contact'
  },
]

export default function Header() {

  const menuRef = useRef(null)
  const {user, role} = useContext(AuthContext)

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu')

  return (
    <header className='header flex items-center'>
      <div className='container'>
        <div className='flex items-center justify-between'>
          {/**logo */}
          
          <div className='flex items-center'>
            <img src={logo} alt="logo" className="w-[80px] h-auto"/>
            <span className="ml-2 text-[18px] font-bold hidden md:inline">MedAppoint</span>
          </div>
            
          {/**navigation bar */}
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className='menu flex items-center gap-[2.7rem]'>
            {
              navLinks.map((link, index) => <li key={index}>
                <NavLink to={link.path} className={navClass => navClass.isActive 
                  ? 'text-primaryColor text-[16px] leading-7 font-[600]' 
                  : 'text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'}>{link.display}</NavLink>
              </li>)
            }
            </ul>
          </div>

          <div className='flex items-center gap-4'>

            {
              user ? <div>
              <Link to={`${role==='specialist' ? '/doctors/profile/me': '/users/profile/me'}`}>
                <figure className='w-[40px] h-[40px] rounded-full cursor-pointer'>
                  <img src={userIcon/**user.photo */} alt="user-avartar" className='w-full rounded-full'/>
                </figure>
              </Link>
              </div> : <Link to='/login'>
                <button className='bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] 
                  flex items-center justify-center rounded-[50px]'>Login</button>
              </Link>

            }         

            <span className='md:hidden' onClick={toggleMenu}>
              <i className="fa-solid fa-bars w-6 h-6 cursor-pointer"></i>
            </span>
          </div>

        </div>
      </div>
    </header>
  )
}
