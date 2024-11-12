import {React, useState, useContext} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from '../config';
import {toast} from 'react-toastify';
import {AuthContext} from '../context/authContext';
import signInImg from '../assets/images/signin.png'

export default function Login() {

  const [message, setMessage] = useState('')

  const [formData, setFormData] = useState({ 
    email:'',
    password:'',
  });

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext)

  const handleInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const submitHandler = async(e) =>{
    e.preventDefault()

    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: formData.email,
        password: formData.password
      });

        if (response.data.errors) {
          setMessage(response.errors.map(err => err.msg).join(', '));
      } else {
        /*console.log(response.data)
        console.log(response.data.user)
        console.log(response.data.user.role)*/

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: response.data.user,
            role: response.data.user.role
          }
        })
          toast.success(response.data.message)
      
          // redirect to home page with logged in view
          navigate('/home')
          
      }
     
    } catch (err) {
      console.error(err.response ? err.response.data : err.message); // Log detailed error
      setMessage(err.response ? err.response.data.message : 'An error occurred');
    }
  }

  return (
    <section className="bg-primaryColor">
      <div>
        <div className="flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-md mx-auto bg-white min-w-[400px]">
              <form className="space-y-4" onSubmit={submitHandler}>
                <div className="mb-8">
                  <h3 className="text-gray-800 text-3xl font-extrabold">Sign in</h3>
                  <p className="text-gray-500 text-sm mt-4">Welcome back! 🎉</p>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email</label>
                  <div className="relative flex items-center">
                    <input name="email" type="email" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 pr-10"
                     placeholder="Enter email" onChange={handleInputChange}/>
                    <i className="fa-regular fa-envelope absolute right-3"></i>
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <input name="password" type="password" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 pr-10" 
                      placeholder="Enter password" onChange={handleInputChange}/>
                    <i className="fa-regular fa-eye absolute right-3"></i>
                  </div>
                </div>

                <div className='mb-3 text-sm text-red-50'>
                  <p>{message}</p>
                </div>
                
                <div>
                  <button type="submit" className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">Log in</button>
                </div>
                <p className="text-sm mt-8 text-center text-gray-800">Don't have an account? 
                  <Link to='/signup'
                    className='text-primaryColor font-medium ml-2'
                  >Register</Link>
                </p>
              </form>
            </div>
            <div className="lg:h-[400px] md:h-[300px] mt-8 md:mt-0">
              <img src={signInImg} className="w-full h-full object-cover" alt="login pic" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
