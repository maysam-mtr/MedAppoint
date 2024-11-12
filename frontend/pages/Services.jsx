import React from 'react'
import ServicesList from '../components/Services/ServicesList';

export default function Services() {
  return (
    <section>
      <div className="container">
        <div className='xl:w-[470px] mx-auto'>
            <h2 className='heading text-center'>Our medical services</h2>
            <p className='text-parag text-center'>Welcome to the Heart of Quality Healthcare: Explore Our Comprehensive Range of Medical Services</p>
          </div>
          <ServicesList isHomePage={false}/>
      </div>
    </section>
  )
}
