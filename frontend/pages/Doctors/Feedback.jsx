import React, { useContext } from 'react'
import { useState, useEffect, } from 'react';
import {formatDate} from '../../utils/formatDate'
import FeedbackForm from './FeedbackForm';
import userImg from '../../assets/images/userImg.png'
import starImg from '../../assets/images/star.png'
import { BASE_URL } from '../../config';
import axios from 'axios'
import { AuthContext } from '../../context/authContext';


export default function Feedback(props) {

  const {id, totalRating} = props;
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [errorMade, setErrorMade] = useState(false)
    const [reviews, setReviews] = useState([])
    const {user, role} = useContext(AuthContext)

    useEffect(()=>{
      const getReviews = async()=>{
        try{
          const response = await axios.get(`${BASE_URL}/reviews/getDoctorReviews/${id}`); 
          if (response.data.errors) {
              console.log(response.data.errors) 
              setErrorMade(true)
              
          } else { 
            console.log(response.data.data)
              setReviews(response.data.data);
              setErrorMade(false)
            
          } 
        } catch (err) { 
            console.error(err.response ? err.response.data : err.message); 
            toast.error(err.response ? err.response.data : err.message)
            setErrorMade(true)
        } 
      }

      getReviews()
    }, [id])

    return (
      <div> { !errorMade &&
        <div className='mb-[30px]'>
          <h4 className='text-[20px] leading-7 font-bold text-headingColor mb-7'>All reviews {totalRating}</h4>

          {reviews?.map((review, index)=>{
            return(
              <div key={index} className='flex justify-between gap-10 mb-7 border border-solid rounded-md border-grey-50 shadow p-3'>
                <div className='flex gap-3'>
                    <figure className='w-10 h-10'>
                      <img src={userImg} className='w-full rounded-full'/>
                    </figure>
        
                    <div>
                        <h5 className='text-[16px] leading-7 text-primaryColor font-bold'>{review.userName}</h5>
                        <p className='text-[14px] leading-6 text-textColor'>{formatDate(review.createdAt)}</p>
                        <p className='text-parag mt-3 font-medium text-[15px]'>{review.reviewText}</p>
                    </div>
                </div>
        
                <div className='flex gap-1 '>{[...Array(review.reviewRating).keys()].map((_, index) => <img src={starImg} key={index} className='w-[15px] h-[15px]'/>)}
                </div>
           </div>
            )
          })}
       
        
  
        </div>
        }
          {!errorMade && role!=="specialist" && !showFeedbackForm && <div className='text-center'>
          <button 
          onClick={()=>setShowFeedbackForm(true)}
          className='btn'>Give feedback</button>
          </div> }
          {!errorMade && role!=="specialist" && showFeedbackForm && <FeedbackForm doctorId={id} userId={user.userId}/>}
          {errorMade && <div>Error loading reviews. Try Again!</div>}
      </div>
    )
  
}
