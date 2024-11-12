import React from 'react'
import { useEffect, useState } from 'react';
import starImg from '../../assets/images/star.png'
import { BASE_URL } from '../../config';
import axios from 'axios'
import { toast } from 'react-toastify';

export default function FeedbackForm(props) {

    const {doctorId , userId} = props

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [reviewText, setReviewText] =useState("");

    const handleSubmitReview = async e => {
        e.preventDefault();

        try{
            if(!rating || !reviewText){
                toast.error("Rating and Review Fields are required")
            }else{
                const response = await axios.post(`${BASE_URL}/reviews/postReview/${userId}/${doctorId}`, {
                    reviewText: reviewText,
                    reviewRating: rating
                }); 
                if (response.data.errors) {
                    console.log(response.data.errors) 
                    toast.error("Error occurred. Please refresh the page.")
                } else { 
                console.log(response.data.data)
                    toast.success("Review posted!")
                    setHover(0)
                    setRating(0)
                    setReviewText('')
                } 
            }
        }catch(err){
            console.error(err.response ? err.response.data : err.message); 
            toast.error(err.response ? err.response.data : err.message)
        }
    };

  return (
    <form action=''>
    <div>
        <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 '>How would you rate your overall experience?</h3>
        <div>{[...Array(5).fill(null).keys()].map((_, index) => {
            index += 1
            return <button 
                        key={index} 
                        type='button'
                        className={`${index <=((rating && hover) || hover) ? 'text-yellowColor' : 'text-gray-400'} bg-transparent border-none outline-none text-[22px] cursor-pointer mr-3`}
                        onClick={()=>setRating(index)} 
                        onMouseEnter={()=>setHover(index)}
                        onMouseLeave={()=>setHover(rating)}
                        onDoubleClick={()=>{setHover(0); setRating(0);}}
                        >   
                    <span> 
                        <i className='fa-regular fa-star h-auto w-[15px]'/>
                    </span> 
                    </button>
        })}</div>
    </div>
    
    <div className='mt-[30px]'>
        <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>Share your feedback or suggestions</h3>
        <textarea 
            className='border border-solid  border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md' 
            rows='5' 
            placeholder='Write your message'
            onChange={(e)=>setReviewText(e.target.value)}
            >
        </textarea>
    </div>

    <button 
    onClick={handleSubmitReview}
    type='submit' 
    className='btn'>Submit Feedback</button>

   </form>
  )
}
