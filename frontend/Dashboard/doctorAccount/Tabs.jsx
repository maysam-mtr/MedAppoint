import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext';
import { BASE_URL } from "../../config"
import axios from 'axios';
import PasswordModal from '../PasswordModal'
import { toast } from 'react-toastify'


export default function Tabs(props) {
    const {tab, setTab} = props
    const {dispatch, user} = useContext(AuthContext)
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
            toast.warn(err.response ? err.response.data.message : 'An error occurred'); 
        } 
      }
  return (
    <div>
        <span className='lg:hidden'>
            <i className='fa-solid fa-circle-chevron-down w-6 h-6 cursor-pointer'/>
        </span>
        <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
            <button 
            onClick={()=>setTab('overview')}
            className={`${
                tab==="overview" 
                ? 'bg-indigo-100 text-primaryColor'
                : 'bg-transparent text-headingColor'
                } w-full mt-0 rounded-md py-[15px] px-[35px] font-[600]`}>
                    Overview
            </button>
            <button 
            onClick={()=>setTab('appointments')}
            className={`${
                tab==="appointments" 
                ? 'bg-indigo-100 text-primaryColor'
                : 'bg-transparent text-headingColor'
                } w-full rounded-md py-[15px] px-[35px] font-[600] mt-[30px]`}>
                    Appointments
            </button>
            <button 
            onClick={()=>setTab('settings')}
            className={`${
                tab==="settings" 
                ? 'bg-indigo-100 text-primaryColor'
                : 'bg-transparent text-headingColor'
                } w-full rounded-md py-[15px] px-[35px] font-[600] mt-[30px]`}>
                    Settings
            </button>

            <div className='mt-[100px] w-full'>
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
    </div>
  )
}
