import { useContext, useEffect, useState } from 'react'
import { BASE_URL } from '../../config'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

export default function MyBookings() {

    const {user, role} = useContext(AuthContext)
    const [hasAppointments, setHasAppointments] = useState(false)
    const [message, setMessage] = useState('')
    const [appointments, setAppointments] = useState([]);

    useEffect(() => { 
        const fetchAppointments = async () => { 
            try { 
                const response = await axios.get(`${BASE_URL}/appointment/getAppointmentsByUser/${user.userId}`); 
                if (response.data.errors) {
                    console.log(response.data.errors) 
                    setMessage(response.data.errors.map(err => err.msg).join(', ')); 
                } else if (!response.data.success) { 
                    setMessage("No appointments made yet!"); 
                } else { 
                    console.log(response.data)
                    console.log(response.data.data)
                    setAppointments(response.data.data); 
                    setHasAppointments(true); 
                } } catch (err) { 
                    console.error(err.response ? err.response.data : err.message); 
                    // Log detailed error 
                    setMessage(err.response ? err.response.data.message : 'An error occurred'); 
                } }; 
                fetchAppointments(); 
            }, [user.userId]);


  return (
    <div>
        {!hasAppointments && <div className='mt-[50px] text-textColor text-center text-[20px] font-semibold'>{message}</div>}
        {hasAppointments && <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
            <thead className='text-xs text-white uppercase bg-irisBlueColor'>
                <tr>
                    <th scope="col" class="px-6 py-3">Appointment Nb</th>
                    <th scope="col" class="px-6 py-3">Doctor</th>
                    <th scope="col" class="px-6 py-3">Date</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appointment, index) => { 
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
                            <td className="px-6 py-3">{appointment.specialistName}</td> 
                            <td className="px-6 py-3">{`${formattedDate} ${formattedTime}`}</td> 
                            <td className={`px-6 py-3 ${textColor}`}>{appointment.appointmentStatus}</td> 
                            </tr> ); 
                    })
                }
            </tbody>
        </table>
        </div>}
    </div>
  )
}
