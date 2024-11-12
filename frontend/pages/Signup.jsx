import {React, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import userImg from '../assets/images/userImg.png'
import axios from 'axios';
import { BASE_URL } from '../config';
import {toast} from 'react-toastify'
import signInImg from '../assets/images/signin.png'

export default function Signup() {

  const [message, setMessage] = useState('')

  const [formData, setFormData] = useState({ 
    fname: '',
    lname: '',
    gender: 'male',
    role: 'patient',
    email:'',
    password:'',
    phone: '',
    photo: null,
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFileInputChange = async(e) =>{
    const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, photo: file }); // Store the actual file object
        }
  }

  const submitHandler = async(e)=>{
    e.preventDefault()

    let user = {
      'fname': formData.fname,
      'lname': formData.lname,
      'email': formData.email,
      'password': formData.password,
      'gender': formData.gender,
      'phone': formData.phone,
      'role': formData.role
    }
        
    // Append the photo file if it exists
    if (formData.photo) {
        user.photo = formData.photo;
        
    }

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, user);

        if (response.data.errors) {
          setMessage(response.data.errors.map(err => err.msg).join(', '));
      } else {
          //setMessage(response.message);
          // redirect to login page
          toast.success(response.data.message)
          navigate('/login');
          
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
                  <h3 className="text-gray-800 text-3xl font-extrabold">Sign up</h3>
                  <p className="text-gray-500 text-sm mt-4">
                    Sign up and explore a world of possibilities. Your journey begins here.
                  </p>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">First Name</label>
                  <div className="relative flex items-center">
                    <input name="fname" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 pr-10"
                     placeholder="Enter First Name" onChange={handleInputChange} value={formData.fname}/>
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Last Name</label>
                  <div className="relative flex items-center">
                    <input name="lname" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 pr-10"
                     placeholder="Enter Last Name" onChange={handleInputChange} value={formData.lname}/>
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email</label>
                  <div className="relative flex items-center">
                    <input name="email" type="email" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 pr-10"
                     placeholder="Enter email" onChange={handleInputChange} value={formData.email}/>
                    <i className="fa-regular fa-envelope absolute right-3"></i>
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <input name="password" type="password" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 pr-10" 
                      placeholder="Enter password" onChange={handleInputChange} value={formData.password}/>
                    <i className="fa-regular fa-eye absolute right-3"></i>
                  </div>
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Phone</label>
                  <div className="relative flex items-center">
                    <input name="phone" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-blue-600 pr-10" 
                      placeholder="Enter phone number" onChange={handleInputChange} value={formData.password}/>
                    <i className="fa-solid fa-phone absolute right-3"></i>
                  </div>
                </div>

                <div className='mb-5 flex items-center justify-between'>
                  <label className='text-headingColor font-semibold text-[16px]'>
                    Are you a: 
                    <select name="role" id="role" value={formData.role} onChange={handleInputChange}
                      className='text-textColor font-semibold text-[15px] px-4 py-3 focus:outline-none'>
                      <option value="patient">Patient</option>
                      <option value="doctor">Doctor</option>
                    </select>
                  </label>

                  <label className='text-headingColor font-semibold text-[16px]'>
                    Gender: 
                    <select name="gender" id="gender" value={formData.gender} onChange={handleInputChange}
                      className='text-textColor font-semibold text-[15px] px-4 py-3 focus:outline-none'>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </label>

                </div>

                <div className='mb-3 text-sm text-red-50'>
                  <p>{message}</p>
                </div>

                <div className='mb-5 flex items-center gap-3'>
                  <figure className='w-[60px] h-[60px] rounded-full flex items-center justify-center'>
                    <img src={userImg} alt="user image" className='w-full rounded-full'/>
                  </figure>

                  <label className='text-headingColor font-semibold text-[16px]'>Photo</label>
                  <div>
                    <input type="file"
                    name='photo'
                    id='customFile'
                    onChange={handleFileInputChange}
                    accept='.jpg, .png'/>
                  </div>
                </div>
                
                <div>
                  <button type="submit" className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                    Sign Up
                  </button>
                </div>
                <p className="text-sm mt-8 text-center text-gray-800">Already have an account? 
                  <Link to='/login'
                    className='text-primaryColor font-medium ml-2'
                  >Login</Link>
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
