import React, { useEffect, useState } from 'react'
import doctorImg from '../../assets/images/feature.png'
import starImg from '../../assets/images/star.png'
import DoctorAbout from './DoctorAbout'
import Feedback from './Feedback'
import SidePanel from './SidePanel'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../config'
import axios from 'axios'

export default function DoctorDetails() {

  const [tab, setTab] = useState('about')
  const {id} = useParams()
  const [doctor, setDoctor] = useState({})
  const [errorMade, setErrorMade] = useState(false)

  useEffect(()=>{
    const getDoctorDetails = async()=>{
      try{
        const response = await axios.get(`${BASE_URL}/specialists/getSpecialist/${id}`); 
        if (response.data.errors) {
            console.log(response.data.errors) 
            setErrorMade(true)
            toast.error("Error occurred. Please refresh the page.")
        } else { 
          console.log(response.data.data)
            setDoctor(response.data.data);
            setErrorMade(false)
          
        } 
      } catch (err) { 
          console.error(err.response ? err.response.data : err.message); 
          toast.error(err.response ? err.response.data : err.message)
          setErrorMade(true)
      } 
    }

    getDoctorDetails()
  }, [id])


  return (
    <section>
      { !errorMade && (
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid md:grid-cols-3 gap-[50px]'>

          <div className='md:col-span-2'>
            <div className='flex items-center gap-5'>
              <figure className='max-w-[200px] max-h-[200px]'>
                <img src={doctorImg} alt="doctor image" />
              </figure>

              <div>
                <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>
                  {doctor.specialization}
                </span>
                <h3 className='text-headingColor text-[22px] leading-9 mt-3 font-bold'>{doctor.fname} {doctor.lname}</h3>
                <div className='flex items-center gap-[6px]'>
                  <span className='flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
                    <img src={starImg} alt="star" className='w-[20px] h-auto'/> {doctor.averageRating}
                  </span>
                  <span className='text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>({doctor.totalRating})</span>
                </div>
              </div>

            </div>

            <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
              <button 
                className={`${tab==='about' && 'border-b border-solid border-primaryColor'} 
                  py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                onClick={() => setTab('about')}>
                  About
                </button>
              <button 
                className={`${tab==='feedback' && 'border-b border-solid border-primaryColor'} 
                  py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                onClick={() => setTab('feedback')}>
                  Feedback
                </button>
            </div>

            <div className='mt-[50px]'>
              {tab === 'about' && doctor.fname && doctor.lname 
                && doctor.about && doctor.qualifications && doctor.experience 
                && <DoctorAbout fname={doctor.fname} lname={doctor.lname} about={doctor.about} qualifications={doctor.qualifications} experience={doctor.experience}/>}
              {tab === 'feedback' && doctor && <Feedback id={doctor.specialistId} totalRating={doctor.totalRating}/>}
            </div>

          </div>{ doctor.specialistId && doctor.ticketPrice && doctor.timeSlots &&
          <div><SidePanel ticketPrice={doctor.ticketPrice} doctorId={doctor.specialistId} timeSlots={doctor.timeSlots}/></div>
          }
        </div>

      </div>
      )}

      {
        errorMade && <div className='items-center'>
          <p className='text-[16px] text-textColor'>Error occured. Please refresh the page!</p>
        </div>
      }
    </section>
  )
}
