import { useContext, useState} from 'react'
import healthcarePositions from './specilizationList'
import {BASE_URL} from '../../config'
import { AuthContext } from '../../context/authContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Profile() {

    const {dispatch, user} = useContext(AuthContext)
    const navigate = useNavigate();
    

    const [formData, setFormData] = useState({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        gender: user.gender,
        specialization: user.specialization || '',
        ticketPrice: user.ticketPrice || 0,
        qualifications: user.qualifications || [],
        experience: user.experience || [],
        timeSlots: user.timeSlots || [],
        about: user.about ||'',
        photo: user.photo
    })


    const handleInputChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value})   
    }

    const handleFileInputChange = (e) =>{

    }

    //function to update the profile
    const updateProfileHandler = async(e) =>{
        e.preventDefault();

        let userdata = {
            'fname': formData.fname,
            'lname': formData.lname,
            'phone': formData.phone,
            'gender': formData.gender,
            "specialization": formData.specialization,
            "ticketPrice": formData.ticketPrice,
            "qualifications": formData.qualifications,
            "timeSlots": formData.timeSlots,
        }

        if (formData.experience){
            userdata.experience = formData.experience
        }

        if(formData.about){
            userdata.about = formData.about
        }

        /**if(photo){
            userdata.photo = formData.photo
        }*/

        try{
            const response = await axios.put(`${BASE_URL}/specialists/updateSpecialist/${user.specialistId}`, userdata); 
            if (response.data.errors) {
                toast.error(response.data.errors.map(err => err.msg).join(', '));
            } else {
                toast.success(response.data.message)
                dispatch({
                    type: 'UPDATE_USER',
                    payload: {
                        user: response.data.data,
                        role:  response.data.data.role
                    }
                })
                
                
                
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    //reusable function for adding items in the form
    const addItem = (key, newItem)=>{
        setFormData(prevFormData => ({...prevFormData, 
            [key]:[...prevFormData[key], newItem]}));
    };

    //reusable input change function
    const handleReusableInputChange = (key, index, e) =>{
        const {name, value} = e.target

        setFormData(prevFormData => {
            const updateItems = [...prevFormData[key]]

            updateItems[index][name] = value

            return {
                ...prevFormData,
                [key]: updateItems
            }
        })
    }

    //reusable delete item function
    const deleteItem = (key, index) =>{
        setFormData(prevFormData => ({...prevFormData, 
            [key]:prevFormData[key].filter((_, i) => i!== index)}))
    }

    const addQualification = (e) =>{
        e.preventDefault();

        addItem('qualifications', {
            startingDate: '', 
            endingDate: '', 
            degree: '', 
            university: ''
        });
    };

    const handleQualificationChange = (e, index) =>{
        handleReusableInputChange('qualifications', index, e)
    }

    const deleteQualification = (e, index) =>{
        e.preventDefault()
        deleteItem('qualifications', index)
    }

    const addExperience = (e) =>{
        e.preventDefault();

        addItem('experience', {
            startingDate: '', 
            endingDate: '', 
            position: '', 
            place: ''
        });
    };

    const handleExperienceChange = (e, index) =>{
        handleReusableInputChange('experience', index, e)
    }

    const deleteExperience = (e, index) =>{
        e.preventDefault()
        deleteItem('experience', index)
    }

    const addTimeSlot = (e) =>{
        e.preventDefault();

        addItem('timeSlots', {
            day: '',
            startingTime: '', 
            endingTime: '', 
        });
    };

    const handleTimeSlotChange = (e, index) =>{
        handleReusableInputChange('timeSlots', index, e)
    }

    const deleteTimeSlot = (e, index) =>{
        e.preventDefault()
        deleteItem('timeSlots', index)
    }


  return (
    <div>
        <h2 className='text-headingColor font-bold text-[24px] mb-10'>
            Profile Information
        </h2>

        <form>
            <div className="mb-5">
                <p className="form-label">First Name*</p>
                <input type="text" 
                        name="fname" 
                        value={formData.fname} 
                        onChange={handleInputChange} 
                        placeholder='First Name' 
                        className='form-input'/>
            </div>

            <div className="mb-5">
                <p className="form-label">Last Name*</p>
                <input type="text" 
                        name="lname" 
                        value={formData.lname} 
                        onChange={handleInputChange} 
                        placeholder='Last Name' 
                        className='form-input'/>
            </div>

            <div className="mb-5">
                <p className="form-label">Email*</p>
                <input type="email" 
                        name="lname" 
                        value={formData.email} 
                        placeholder='Email' 
                        className='form-input' 
                        disabled/>
            </div>

            <div className="mb-5">
                <p className="form-label">Phone*</p>
                <input type="text" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder='Phone number' 
                        className='form-input'/>
            </div>

            <div className='mb-5'>
                <div className="grid grid-cols-3 gap-5 mb-[30px]">
                    <div>
                        <p className="form-label">Gender*</p>
                        <select name="gender" 
                                value={formData.gender} 
                                onChange={handleInputChange}
                                className='form-input'>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                </select>
                    </div>
                
                    <div>
                        <p className="form-label">Specialization*</p>
                        <select name="specialization" 
                                value={formData.specialization} 
                                onChange={handleInputChange}
                                className='form-input'>
                                {healthcarePositions.map((position, index) => (
                                <option key={index} value={position}>{position}</option>
                            ))}
                        </select>
                    </div>
                
                    <div>
                        <p className='form-label'>
                            Ticket Price*
                        </p>
                        <input type="number" 
                                placeholder='0'
                                name="ticketPrice" 
                                value={formData.ticketPrice}
                                className='form-input'
                                onChange={handleInputChange}/>
                    </div>
                
                </div>
            </div>

            <div className='mb-5'>
                <p className='form-label'>Qualifications*</p>
                {
                    formData.qualifications?.map((item, index)=> (
                    <div key={index}>
                        <div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <p className='form-label'>Starting Date*</p>
                                    <input type="date" 
                                            name='startingDate' 
                                            value={item.startingDate} 
                                            className='form-input'
                                            onChange={e => handleQualificationChange(e, index)}/>
                                </div>
                                <div>
                                    <p className='form-label'>Ending Date*</p>
                                    <input type="date" 
                                            name='endingDate' 
                                            value={item.endingDate} 
                                            className='form-input'
                                            onChange={e => handleQualificationChange(e, index)}/>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-5 mt-5'>
                                <div>
                                    <p className='form-label'>Degree*</p>
                                    <input type="text" 
                                            name='degree' 
                                            value={item.degree} 
                                            className='form-input'
                                            onChange={e => handleQualificationChange(e, index)}/>
                                </div>
                                <div>
                                    <p className='form-label'>University*</p>
                                    <input type="text" 
                                            name='university' 
                                            value={item.university} 
                                            className='form-input'
                                            onChange={e => handleQualificationChange(e, index)}/>
                                </div>
                            </div>

                            <button className='bg-red-600 rounded-full w-[40px] 
                                h-[40px] text-white text-[18px] mt-2 mb-[30px] 
                                cursor-pointer' onClick={e => deleteQualification(e, index)}>
                                <i class="fa-solid fa-trash"/>
                            </button>
                        </div>
                    </div>
                    ))}

                    <button className='bg-irisBlueColor py-2 px-5 rounded text-white 
                        h-fit cursor-pointer' onClick={addQualification}>
                        Add Qualification
                    </button>
            </div>

            <div className='mb-5'>
                <p className='form-label'>Experience*</p>
                {
                    formData.experience?.map((item, index)=> (
                    <div key={index}>
                        <div>
                            <div className='grid grid-cols-2 gap-5'>
                                <div>
                                    <p className='form-label'>Starting Date*</p>
                                    <input type="date" 
                                            name='startingDate' 
                                            value={item.startingDate} 
                                            className='form-input'
                                            onChange={e => handleExperienceChange(e, index)}/>
                                </div>
                                <div>
                                    <p className='form-label'>Ending Date*</p>
                                    <input type="date" 
                                            name='endingDate' 
                                            value={item.endingDate} 
                                            className='form-input'
                                            onChange={e => handleExperienceChange(e, index)}/>
                                </div>
                            </div>

                            <div className='grid grid-cols-2 gap-5 mt-5'>
                                <div>
                                    <p className='form-label'>Position*</p>
                                    <input type="text" 
                                            name='position' 
                                            value={item.position} 
                                            className='form-input'
                                            onChange={e => handleExperienceChange(e, index)}/>
                                </div>
                                <div>
                                    <p className='form-label'>Place*</p>
                                    <input type="text" 
                                            name='place' 
                                            value={item.place} 
                                            className='form-input'
                                            onChange={e => handleExperienceChange(e, index)}/>
                                </div>
                            </div>

                            <button className='bg-red-600 rounded-full w-[40px] h-[40px] 
                                text-white text-[18px] mt-2 mb-[30px] cursor-pointer'
                                onClick={e => deleteExperience(e, index)}>
                                <i class="fa-solid fa-trash"/>
                            </button>
                        </div>
                    </div>
                    ))}

                    <button className='bg-irisBlueColor py-2 px-5 rounded text-white h-fit 
                    cursor-pointer' onClick={addExperience}>
                        Add Experience
                    </button>
            </div>

            <div className='mb-5'>
                <p className='form-label'>Time Slots*</p>
                {
                    formData.timeSlots?.map((item, index)=> (
                    <div key={index}>
                        <div>
                            <div className='grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5'>
                                <div>
                                    <p className='form-label'>Day*</p>
                                    <select name="day" 
                                            value={item.day} 
                                            className='form-input py-3.5'
                                            onChange={e => handleTimeSlotChange(e, index)}>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                        <option value="Sunday">Sunday</option>
                                    </select>
                                </div>
                                <div>
                                    <p className='form-label'>Starting Time*</p>
                                    <input type="time" 
                                            name='startingTime' 
                                            value={item.startingTime} 
                                            className='form-input'
                                            onChange={e => handleTimeSlotChange(e, index)}/>
                                </div>

                                <div>
                                    <p className='form-label'>Ending Time*</p>
                                    <input type="time" 
                                            name='endingTime' 
                                            value={item.endingTime} 
                                            className='form-input'
                                            onChange={e => handleTimeSlotChange(e, index)}/>
                                </div>
                                <div className='flex items-center'>
                                    <button className='bg-red-600 rounded-full w-[40px] h-[40px] 
                                        text-white text-[18px] mt-6 cursor-pointer'
                                        onClick={e => deleteTimeSlot(e, index)}>
                                        <i class="fa-solid fa-trash"/>
                                     </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}

                    <button className='bg-irisBlueColor py-2 px-5 rounded text-white h-fit 
                    cursor-pointer' onClick={addTimeSlot}>
                        Add Time Slot
                    </button>
            </div>

            <div className="mb-5">
                <p className='form-label'>About*</p>
                <textarea name="about" rows={5} value={formData.about} 
                    placeholder='Write about you...' onChange={handleInputChange}
                    className='form-input'></textarea>
            </div>

            <div className="mb-5 flex flex-col gap-3">
            <p className='form-label'>Photo*</p>
                <input type="file"
                        name='photo'
                        id='customFile'
                        //value={formData.phone}
                        //onChange={handleFileInputChange}
                        accept='.jpg, .png' />

            </div>

            <div className="mt-7" type="submit" onClick={updateProfileHandler}>
                <button className='bg-primaryColor text-white text-[18px] w-full py-3 px-4 rounded-lg'>Update Profile</button>
            </div>

        </form>
    </div>
  )
}
