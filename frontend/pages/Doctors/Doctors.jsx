import React, { useEffect, useState } from 'react'
import { doctors } from "../../assets/data/doctors";
import DoctorCard from "../../components/Doctors/DoctorCard";
import axios from 'axios'
import { BASE_URL } from '../../config';

export default function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')

  const getDoctors = async() =>{
    try{
      const response = await axios.get(`${BASE_URL}/specialists/getAllSpecialists`); 
      if (response.data.errors) {
          console.log(response.data.errors) 
          setMessage("Error getting doctors. Try Again!");
      } else { 
          setMessage('')
          setDoctors(response.data.data);
          console.log(response.data.data)
      } 
    } catch (err) { 
        console.error(err.response ? err.response.data : err.message); 
        
        setMessage("Error getting doctors. Try Again!");
    } 
  }

  useEffect(()=>{

    getDoctors();
  }, [])

  const handleSearch = async() =>{
    setQuery(query.trim())

    if(!query){
      // If query is empty, fetch all doctors again 
      getDoctors();
      return
    }

    try{
      const response = await axios.get(`${BASE_URL}/specialists/search?query=${query}`); 
      if (response.data) {
          setMessage('')
          setDoctors(response.data.data);
          console.log(response.data.data)
      } 
    } catch (err) { 
        console.error(err.response ? err.response.data : err.message);
        setMessage(err.response ? err.response.data.message : "Error getting doctors. Try Again!");
        
        
        
    } 
  }

  return (
    <>
      <section className='bg-[#fff9ea]'>
        <div className='container text-center'>
          <h2 className='heading'>Find a doctor</h2>
          <div className='max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between'>
            <input 
              type='search' 
              className='py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor'
               placeholder='Search for a doctor by name or specialty'
               value={query}
               onChange={e=> setQuery(e.target.value)} />
              <button onClick={handleSearch}
              className='mt-0 rounded-[0px] rounded-r-md text-white px-[35px] bg-primaryColor text-[#FFFFFF] font-[600] py-[15px]'>
                Search
              </button>
          </div>
        </div>
      </section>
    
      {
        message && <div className='text-textColor pl-5'>{message}</div>
      }
      {
        !message && (
          <section>
            <div className="container">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px] lg:grid-cols-4">
                  {doctors?.map(doctor => (
                      <DoctorCard key={doctor.specialistId} doctor={doctor} />
                  ))}
              </div>
            </div>
          </section>
        )
      }

    </>
  )
}
