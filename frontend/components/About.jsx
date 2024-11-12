import React from 'react'
import { Link } from 'react-router-dom';
import aboutImg from '../assets/images/about.png'

export default function About() {
  return (
    <section className='pt-[60px] 2xl:pt-[100px]'>
      <div className="container">
        <div className="flex flex-col lg:flex-row justify-between pt-[40px] gap-[50px] lg:gap-[130px] xl:gap-0">
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10">
            <img src={aboutImg} className='h-[90%]' alt="About MediCare" />
          </div>
          <div className='w-full lg:w-1/2 xl:w-[670px]'>
            <h2 className='heading'>Proud to be one of the nation's best</h2>
            <p className='text-parag'>
              MedAppoint, one of the nation's premier healthcare providers, is committed to delivering top-tier medical services with unwavering standards of quality and compassion.
            </p>
            <p className='text-parag'>
              This recognition motivates us to innovate and enhance our healthcare offerings, reaffirming our commitment to your well-being. We eagerly anticipate the opportunity to care for you with dedication and expertise, making your health our top priority.
            </p>
            <Link to='/'>
              <button className='btn'>Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
