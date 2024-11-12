import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/authContext'
import { BASE_URL } from '../../config'
import { toast } from 'react-toastify'

export default function Appointments() {

    const {user} = useContext(AuthContext)
    const [errorMade, setErrorMade] = useState(true)
    const [appointments, setAppointments] = useState([])
    const [pendingAppointments, setPendingAppointments] = useState([])
    const [pendingError, setPendingError] = useState(false)

    

    useEffect(()=>{
        const getAppointmentsFunc = async()=>{
            try{
                const response = await axios.get(`${BASE_URL}/appointment/getAppointmentsBySpecialist/${user.specialistId}`); 
                if (response.data.errors) {
                    console.log(response.data.errors) 
                    setErrorMade(true);
                } else { 
                    setErrorMade(false);
                    setAppointments(response.data.data);
                    console.log(response.data.data)
                } 
              } catch (err) { 
                  console.error(err.response ? err.response.data : err.message); 
                  setErrorMade(true);
                  
              } 
        }

        const getPendingAppointmentsFunc = async()=>{
            try{
                const response = await axios.get(`${BASE_URL}/appointment/getPendingAppointments/${user.specialistId}`); 
                if (response.data.errors) {
                    console.log(response.data.errors) 
                    setPendingError(true);
                } else { 
                    setPendingError(false);
                    setPendingAppointments(response.data.data);
                    console.log(response.data.data)
                } 
              } catch (err) { 
                  console.error(err.response ? err.response.data : err.message); 
                  setErrorMade(true);
                  setPendingError(true);
                  toast.error(err.response ? err.response.data : err.message)
                  
              } 
        }

        getAppointmentsFunc();
        getPendingAppointmentsFunc();
    }, [])

    const handleAccept = async (appointmentId) => { 
        try { 
            const response = await axios.put(`${BASE_URL}/appointment/updateAppointment/${appointmentId}`, { 
                appointmentStatus: 'accepted', 
            }); 
            if (response.data.errors) { 
                console.log(response.data.errors); 
                setPendingError(true);
                toast.error("Failed to accept appointment!")
            } else { 
                setPendingError(false);
                setPendingAppointments((prev) => prev.filter((appointment) => appointment.appointmentId !== appointmentId) ); 
                console.log(response.data.data);
                toast.success("Appointment Accepted!")
            } 
        } catch (err) { 
            console.error(err.response ? err.response.data : err.message); 
            setPendingError(true);
            toast.error("Failed to accept appointment!")
        } 
    }; 
    
    const handleReject = async (appointmentId) => { 
        try { 
            const response = await axios.put(`${BASE_URL}/appointment/updateAppointment/${appointmentId}`, { 
                appointmentStatus: 'rejected', 
            }); 
            if (response.data.errors) { 
                console.log(response.data.errors); 
                setErrorMade(true); 
                toast.error("Failed to reject appointment!")
            } else { 
                setErrorMade(false); 
                setPendingAppointments((prev) => prev.filter((appointment) => appointment.appointmentId !== appointmentId) ); 
                console.log(response.data.data); 
                toast.success("Appointment Rejected!")
            } 
        } catch (err) { 
            console.error(err.response ? err.response.data : err.message); 
            setErrorMade(true); 
            toast.error("Failed to reject appointment!")
        } 
    };

  return (
    <div>
        {
            errorMade===true && <div className='text-red-500'>Error getting appointments. Try Again!</div>
        }
        {
            errorMade===false && (
                <div>
                    <h2 className='text-headingColor font-bold text-[24px] mb-10'>
                        My Appointments
                    </h2>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                        
                        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                            <thead className='text-xs text-white uppercase bg-irisBlueColor'>
                                <tr>
                                    <th scope="col" class="px-6 py-3">Appointment Nb</th>
                                    <th scope="col" class="px-6 py-3">Patient</th>
                                    <th scope="col" class="px-6 py-3">Date</th>
                                    <th scope="col" class="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments?.map((appointment, index) => { 
                                    const date = new Date(appointment.appointmentDate); 
                                    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }); 
                                    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); 
                                    let textColor = "text-green-500"
                                    if(appointment.appointmentStatus === "rejected"){
                                        textColor = "text-red-500"
                                    }else if(appointment.appointmentStatus === "pending"){
                                        textColor = "text-yellow-500"
                                    }
                                    return ( 
                                        <tr key={index} className='odd:bg-white even:bg-gray-50 border-b'> 
                                            <td className="px-6 py-3">{index + 1}</td> 
                                            <td className="px-6 py-3">{appointment.userName}</td> 
                                            <td className="px-6 py-3">{`${formattedDate} ${formattedTime}`}</td> 
                                            <td className={`px-6 py-3 ${textColor}`}>{appointment.appointmentStatus}</td> 
                                            </tr> ); 
                                    })
                                }
                            </tbody>
                        </table>
                    </div>

                    <h2 className='text-headingColor font-bold text-[24px] mb-10 mt-7'>
                        Pending Appointments
                    </h2>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
                        
                        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
                            <thead className='text-xs text-white uppercase bg-irisBlueColor'>
                                <tr>
                                    <th scope="col" class="px-6 py-3">Appointment Nb</th>
                                    <th scope="col" class="px-6 py-3">Patient</th>
                                    <th scope="col" class="px-6 py-3">Date</th>
                                    <th scope="col" class="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!pendingError && pendingAppointments?.map((appointment, index) => { 
                                    const date = new Date(appointment.appointmentDate); 
                                    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }); 
                                    const formattedTime = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }); 
                                    let textColor = "text-green-500"
                                    if(appointment.appointmentStatus === "rejected"){
                                        textColor = "text-red-500"
                                    }else if(appointment.appointmentStatus === "pending"){
                                        textColor = "text-yellow-500"
                                    }
                                    return ( 
                                        <tr key={index} className='odd:bg-white even:bg-gray-50 border-b'> 
                                            <td className="px-6 py-3">{index + 1}</td> 
                                            <td className="px-6 py-3">{appointment.userName}</td> 
                                            <td className="px-6 py-3">{`${formattedDate} ${formattedTime}`}</td> 
                                            <td className={`px-6 py-3 ${textColor}`}>
                                                <div className='flex flex-row items-center gap-2'>
                                                    <button className='bg-green-500 rounded-[5px] text-white p-2' 
                                                            onClick={()=> handleAccept(appointment.appointmentId)}>Accept</button>
                                                    <button className='bg-red-500 rounded-[5px] text-white p-2' 
                                                            onClick={()=> handleReject(appointment.appointmentId)}>Reject</button>
                                                </div>
                                                </td> 
                                            </tr> ); 
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                
            )
        }
    
    </div>
   
  )
}
