import React from 'react'
import heroImg1 from '../assets/images/hero1.png'
import icon1 from '../assets/images/icon1.png'
import icon2 from '../assets/images/icon2.png'
import icon3 from '../assets/images/icon3.png'
import {Link} from 'react-router-dom'
import About from '../components/About'
import Feature from '../components/Feature'
import ServicesList from '../components/Services/ServicesList'

export default function Home() {
  return (
    <>
      {/**hero section*/}
      <section className='hero_section pt-[60px] 2xl:h-[800px]'>
        <div className='container'>
          <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between'>

            {/**hero content */}
            <div>
              <div className='lg:w-[570px]'>
                <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] 
                  md:text-[60px] md:leading-[70px]'>
                    We help patients live a healthy, long life.
                  </h1>

                  <p className='text-parag'>
                    Welcome to MedAppoint! Got any health concern or checkup? Search for a doctor and get that appointment!
                  </p>

                  <button className='btn'>Request an Appoitment</button>
              </div>

              <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>

                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                    30+
                  </h2>
                  <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]' ></span>
                  <p className='text-parag'>Years of Experience</p>
                </div>

                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                    15+
                  </h2>
                  <span className='w-[100px] h-2 bg-darkBlueColor rounded-full block mt-[-14px]' ></span>
                  <p className='text-parag'>Clinic Locations</p>
                </div>

                <div>
                  <h2 className='text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor'>
                    100%
                  </h2>
                  <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]' ></span>
                  <p className='text-parag'>Patient Satisfaction</p>
                </div>
              </div>
            </div>

            {/**hero content */}
            <div className='flex justify-end'>
              <img className='h-auto w-[500px]' src={heroImg1} alt="hero image 1" />
            </div>

          </div>
        </div>
      </section>

      {/**end of hero section */}
      <section>
        <div className="container">
          <div className='lg:w-[470px] mx-auto'>
            <h2 className='heading text-center'>
              Providing the best medical services
            </h2>
            <p className='text-parag text-center'>World-class care for everyone. Our health system offers unmatched, expert health care.</p>
          </div>
        </div>


        <div className='grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
          <div className='py-[30px] px-5'>
            <div className='flex items-center justify-center'>
              <img src={icon1} alt="icon 1" className='w-[150px] h-auto'/>
            </div>

            <div className="mt-[30px]">
              <h2 className='text-[26px] leading 9 text-headingColor font-[700] text-center'>
                Find a Doctor
              </h2>
              <p className='text-[16px] leadning-7 text-textColor font-[400] mt-4 text-center'>
                Caring starts with finding the right doctor. Discover your ideal healthcare partner at MedAppoint.
              </p>

              <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <i className="fa-solid fa-arrow-right group-hover:text-white"></i>
              </Link>
            </div>
          </div>

          <div className='py-[30px] px-5'>
            <div className='flex items-center justify-center'>
              <img src={icon2} alt="icon 2" className='w-[150px] h-auto'/>
            </div>

            <div className="mt-[30px]">
              <h2 className='text-[26px] leading 9 text-headingColor font-[700] text-center'>
                Find a Location
              </h2>
              <p className='text-[16px] leadning-7 text-textColor font-[400] mt-4 text-center'>
                Locating healthcare services made easy. Discover our conveniently situated facilities.
              </p>

              <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <i className="fa-solid fa-arrow-right group-hover:text-white"></i>
              </Link>
            </div>
          </div>

          <div className='py-[30px] px-5'>
            <div className='flex items-center justify-center'>
              <img src={icon3} alt="icon 3" className='w-[150px] h-auto'/>
            </div>

            <div className="mt-[30px]">
              <h2 className='text-[26px] leading 9 text-headingColor font-[700] text-center'>
                Book Appointment
              </h2>
              <p className='text-[16px] leadning-7 text-textColor font-[400] mt-4 text-center'>
                Seamless healthcare at your fingertips. Book an Appointment and safeguard your well-being.
              </p>

              <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'>
                <i className="fa-solid fa-arrow-right group-hover:text-white"></i>
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/**about section */}
      <About/>

      {/**services section */}
      <section>
        <div className='container'>
          <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Our medical services</h2>
            <p className='text-parag text-center'>Welcome to the Heart of Quality Healthcare: Explore Our Comprehensive Range of Medical Services</p>
          </div>
          <ServicesList isHomePage={true}/>
        </div>
        </section>

      {/**feature section */}
      <Feature/>
      <section></section>
      
    </>
  )
}
