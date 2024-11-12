import { useContext, useState } from 'react'
import Tabs from './Tabs'
import { AuthContext } from '../../context/authContext'
import userPic from '../../assets/images/feature.png'
import starImg from '../../assets/images/star.png'
import DoctorAbout from '../../pages/Doctors/DoctorAbout'
import Profile from './Profile'
import Appointments from './Appointments'

export default function Dashboard() {
  const {user} = useContext(AuthContext)

  const [tab, setTab] = useState('overview')
  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
          <Tabs tab={tab} setTab={setTab}/>
          <div className='lg:col-span-2'>
            {user.isApproved === 'pending' && (
              <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
                <i class="fa-solid fa-circle-question w-5 h-5 flex-shrink-0 text-yellow-800"></i>
              
              <span className='sr-only'>Info</span>
              <div className='ml-3 text-sm font-medium'>
                To get approval please complete your profile. We&apos;ll review 
                manually and approve within 3 days.
              </div>
            </div>
          )}

          <div className='mt-8'>
            {tab==='overview' && (
              <div>
                <div className='flex items-center gap-4 mb-10'>
                  <figure>
                    <img src={/**doctor photo */ userPic} 
                      className='max-w-[200px] max-h-200px]'
                      alt="doctor pic" />
                  </figure>

                  <div>
                    <span className='bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded-md 
                      text-[12px] lg:text-[16px] font-semibold'>
                        {user.specialization}
                      </span>

                      <h3 className='text-[22px] font-bold text-headingColor mt-3'>
                        {user.fname} {user.lname}
                      </h3>

                      <div className='flex items-center gap-[6px]'>
                        <span className='flex items-center gap-[6px] text-headingColor text-[14px] 
                          lg:text-[16px] font-semibold'>
                          <img src={starImg} alt="star" className='w-[15px]'/>
                          {user.averagerating}
                        </span>
                        <span className='text-textColor text-[14px] lg:text-[16px] font-semibold'>
                          ({user.totalRating})
                        </span>
                      </div>
                  </div>
                </div>
                { user.isApproved === 'approved' && (
                  <DoctorAbout 
                  fname={user.fname} 
                  lname={user.lname} 
                  about={user.about} 
                  qualifications={user.qualifications} 
                  experience={user.experience}
                  />
                )}
              </div>
            
            )}


            {tab==='appointments' && <Appointments/>}


            {tab==='settings' && <Profile/>}
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
