import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../../config"
import { toast } from "react-toastify"
import userImg from '../../assets/images/userImg.png'
import { AuthContext } from "../../context/authContext"
import axios from 'axios'


export default function Profile() {

    const {user, role} = useContext(AuthContext)

    const [message, setMessage] = useState('')

    const [formData, setFormData] = useState({ 
      fname: user.fname,
      lname: user.lname,
      gender: user.gender,
      role: role,
      email:user.email,
      phone: user.phone,
      photo: null,
    });

  const navigate = useNavigate();

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

    let userdata = {
      'fname': formData.fname,
      'lname': formData.lname,
      'phone': formData.phone,
      'gender': formData.gender
    }
        
    // Append the photo file if it exists
    if (formData.photo) {
        userdata.photo = formData.photo;
        
    }

    try {
      const response = await axios.put(`${BASE_URL}/user/updateUser/${user.userId}`, userdata);

        if (response.data.errors) {
          setMessage(response.data.errors.map(err => err.msg).join(', '));
      } else {
          //setMessage(response.message);,
          toast.success(response.data.message)
          
      }
     
    } catch (err) {
      console.error(err.response ? err.response.data : err.message); // Log detailed error
      setMessage(err.response ? err.response.data.message : 'An error occurred');
    }
  }

  return (
    <div>
        <form onSubmit={submitHandler} className="mt-[50px]">
            <div className="mb-5">
                <input 
                type="text"
                placeholder="First Name" 
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none 
                focus:border-b-primaryColor text-[16px] text-headingColor placeholder:text-textColor cursor-pointer" required/>
                
            </div>

            <div className="mb-5">
                <input 
                type="text"
                placeholder="Last Name" 
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none 
                focus:border-b-primaryColor text-[16px] text-headingColor placeholder:text-textColor cursor-pointer" required/>
            </div>

            <div className="mb-5">
                <input 
                type="email"
                placeholder="Email" 
                name="email"
                value={formData.email}
                disabled
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none 
                focus:border-b-primaryColor text-[16px] text-textColor placeholder:text-textColor cursor-pointer"/>
            </div>

            <div className="mb-5">
                <input 
                type="text"
                placeholder="Phone Number" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none 
                focus:border-b-primaryColor text-[16px] text-headingColor placeholder:text-textColor cursor-pointer" required/>
            </div>

            <label className="text-headingColor font-bold text-[16px]">
                Gender:
                <select name="gender" 
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="text-headingColor font-semibold text-[15px] px-4 py-3 focus:outline-none">
                            <option value={formData.gender}>{formData.gender}</option>
                            {
                                formData.gender === 'male' && <option value='female'>female</option>
                            }
                            {
                                formData.gender === 'female' && <option value='male'>male</option>
                            }
                        </select>
            </label>

            <div className='mb-3 text-sm text-red-50'>
                  <p>{message}</p>
            </div>

            <div className='mb-5'>
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
                  <button type="submit" className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-primaryColor hover:bg-blue-700 focus:outline-none">
                    Update
                  </button>
            </div>

        </form>
    </div>
  )
}
