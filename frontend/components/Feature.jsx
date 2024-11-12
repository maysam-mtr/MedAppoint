import React from 'react'
import {Link} from 'react-router-dom';
import featureImg from '../assets/images/feature.png'

export default function Feature() {
  return (
    <section>
        <div className='container'>
            <div className='flex items-center justify-between flex-col lg:flex-row'>
            {/*=====feature content=======*/}
                <div className='xl:w-[670px]'>
                    <h2 className='	heading'>Get virtual treatment <br/>anytime. </h2>
                    <ul className='pl-4'>
                        <li className='text-parag'>
                            1. Schedule the appointment directly.
                        </li>
                        <li className='text-parag'>
                            2. Search for your physician here, and contact their office.
                        </li>
                        <li className='text-parag'>
                             3. View available physicians ready to attend to your health needs, use the online scheduling tool to select an appointment
                        </li>
                        <li className='text-parag'>
                            4. Set a reminder.
                        </li>
                    </ul>
                    <Link to='/'>
                        <button className='btn'>Learn More</button>
                    </Link>
                </div>
                {/*=====feature img=======*/}
                <div className='flex justify-end mt-[50px] lg:mt-0'>
                    <img src={featureImg} alt='nurse' className='w-[400px] h-auto'/>
                </div>
            </div>
        </div>
    </section>

  )
}
