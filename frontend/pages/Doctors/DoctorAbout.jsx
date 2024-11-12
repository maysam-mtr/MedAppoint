import React from 'react'
import {formatDate} from '../../utils/formatDate'

export default function DoctorAbout(props) {
    const {fname, lname, about, qualifications, experience} = props;
  return (
    <div>
        <div>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'> 
                About 
                <span className='text-irisBlueColor font-bold text-[24px] leading-9'>
                  {fname} {lname}
                </span>
            </h3>
            <p className='text-parag'>
                {about}
            </p>
        </div>

        <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Education</h3>
            <ul className='pt-4 md:p-5'>
                {qualifications.map((qualification, index) => (
                    <li key={index} className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                        <div>
                            <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                                {formatDate(qualification.startingDate)} - {formatDate(qualification.endingDate)}
                            </span>
                            <p className='text-[16px] leading-6 font-medium text-textColor'>
                                {qualification.degree}
                            </p>
                        </div>
                        <p className='text-[14px] leading-5 font-medium text-textColor'>
                            {qualification.university}
                        </p>
                    </li>
                ))}
            </ul>
        </div>

        
        <div className="mt-[12px]">
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>Experience</h3>
            <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
            {experience.map((exp, index) => (
                <li key={index} className="p-4 rounded bg-[#fff9ea]">
                    <span className="text-yellowColor text-[15px] leading-6 font-semibold">{formatDate(exp.startingDate)} - {formatDate(exp.endingDate)}</span>
                    <p className='text-[16px] leading-6 font-medium text-textColor '>{exp.position}</p>
                    <p className='text-[12px] leading-6 font-medium text-textColor '>{exp.place}</p>
                </li>
            ))}
            </ul>
        </div>

    </div>
  )
}
