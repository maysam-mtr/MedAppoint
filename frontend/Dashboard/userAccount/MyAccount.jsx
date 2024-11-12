import { useEffect } from 'react'
import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import userPic from '../../assets/images/userpic.png'
import MyBookings from './MyBookings'
import Profile from './Profile'
import axios from 'axios';
import PasswordModal from '../PasswordModal'
import { toast } from 'react-toastify'
import { BASE_URL } from "../../config"

export default function MyAccount() {
  const {dispatch, user} = useContext(AuthContext)
  const [tab, setTab] = useState('bookings')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () =>{
    dispatch({ type: "LOGOUT"});
  }

  const handleDeleteAccount = async(password) =>{
    try{
      const response = await axios.post(`${BASE_URL}/user/deleteUser/${user.userId}`, {
        password: password  // Send password in the request body
      }); 
      if (response.data.errors) {
          console.log(response.data.errors) 
          toast.warn(response.data.errors.map(err => err.msg).join(', ')) 
      } else { 
           toast.success("Account deleted!")
           dispatch({ type: "LOGOUT"});
      } 
    } catch (err) { 
        console.error(err.response ? err.response.data : err.message); 
        // Log detailed error 
        toast.error(err.response ? err.response.data.message : 'An error occurred'); 
    } 
  }

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid md:grid-cols-3 gap-10'>
          <div className='pb-[50px] px-[30px] shadow-md border boder-solid border-grey-70 rounded-[20px]'>
            <div className='flex items-center justify-center  mt-5'>
              <figure className='w-[100px] h-[100px] rounded-full border-2 border-solid border-irisBlueColor'>
                <img src={userPic} alt="" className='w-full h-full rounded-full'/>
              </figure>
            </div>

            <div className='text-center mt-4'>
              <h3 className='text-[18px] leading-[30px] text-headingColor font-bold'>{user.fname} {user.lname}</h3>
              <p className='text-textColor text-[15px] leading-6 font-medium '>
                {user.email}
              </p>
              <p className='text-textColor text-[15px] leading-6 font-medium '>
                {user.phone}
              </p>
            </div>

            <div className='mt-[50px] md:mt-[100px]'>
              <button onClick={handleLogout} 
              className='w-full bg-irisBlueColor p-3 text-[16px] leading-7 rounded-md text-white'>
                Logout
              </button>
              <button onClick={() => setIsModalOpen(true)} className='w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white'>
                Delete account
              </button>
              <PasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDeleteAccount} /> 
            </div>
          </div>

          <div className='md:col-span-2 md:px-[30px]'>
            <div>
              <button onClick={() => setTab('bookings')} 
              className={`${tab==='bookings' && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-[20px] text-headingColor font-semibold text-[16px] 
                leading-7 border border-solid border-primaryColor`}>
                  My Bookings
              </button>
              
              <button onClick={() => setTab('settings')} 
                      className={`${tab==='settings' && 'bg-primaryColor text-white font-normal'} p-2 mr-5 px-5 rounded-[20px] text-headingColor font-semibold text-[16px] 
                leading-7 border border-solid border-primaryColor`}>
                  Profile Settings
              </button>
            </div>

            {
              tab === 'bookings' && <MyBookings/>
            }
            {
              tab === 'settings' && <Profile/>
            }

          </div>
        </div>
      </div>
    </section>
  )
}
