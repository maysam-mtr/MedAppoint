import {Link} from 'react-router-dom';
import React from 'react'
import doctorImg from '../../assets/images/feature.png'
import starImg from '../../assets/images/star.png'

export default function DoctorCard(props) {
    const {doctor} = props;

  return (
    <div className="p-3 lg:p-5 shadow-lg rounded-lg border border-solid border-grey-50">
        <div>
            <img src={/**doctor.photo*/ doctorImg} className="w-[250px] h-[300px] md:w-[300px] image-container rounded-lg shadow-md border border-2 border-[#CCF0F3]" alt="Doctor images"/>
        </div>
        <h2 className="text-[18px] leading-[30px] lg:text-[26px] lg:leading-9 text-headingColor font-[700] mt-3 lg:mt-5">{doctor.fname} {doctor.lname}</h2>
        
        <div className='mt-2 lg:mt-4 flex items-center justify-between'>
            <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded'>{doctor.specialization}</span>
            
            <div className='flex items-center gap-[6px]'>
                <span className='flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-semibold text-headingColor'>
                    <img src={starImg} className='w-[10px] h-1/4 pb-[2px]' alt='star icon'/>{doctor.averageRating}
                </span>
                <span className='text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor'>({doctor.totalRating})</span>
            </div>
        </div>

        <div className='mt-[18px] lg:mt-5 flex items-center justify-between'>
            <div>
                <p className='text-[14px] leading-6 font-[400] text-textColor'>At MedAppoint Center</p>
            </div>
            <Link to={`/doctors/${doctor.specialistId}`} className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <i className='fa-solid fa-arrow-right group-hover:text-white'/>
            </Link>
        </div>
    </div>
  )
}
