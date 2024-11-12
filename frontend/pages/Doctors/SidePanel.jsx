import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../config';
import { formatDate } from '../../utils/formatDate';
import { AuthContext } from '../../context/authContext';
import { toast } from 'react-toastify';

export default function SidePanel(props) {
  const { ticketPrice, doctorId, timeSlots } = props;
  const [errorMade, setErrorMade] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [btnPressed, setBtnPressed] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (btnPressed) {
      getAppointmentsFunc();
    }
  }, [btnPressed]);

  const getAppointmentsFunc = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/appointment/getAppointmentsBySpecialist/${doctorId}`);
      if (response.data.errors) {
        console.log(response.data.errors);
        setErrorMade(true);
      } else {
        setErrorMade(false);
        setAppointments(response.data.data);
        console.log(response.data.data);
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setErrorMade(true);
    }
  };

  const handleSubmit = async () => {
    console.log('Form submitted with date:', date, 'and time:', time);

    if (!date || !time) {
      toast.warn("Date and time fields cannot be empty");
      return;
    }

    try {
      const fullDate = date + ' ' + time;

      const response = await axios.post(`${BASE_URL}/appointment/createAppointment/${user.userId}/${doctorId}`, {
        appointmentDate: fullDate,
      });

      if (response.data.errors) {
        console.log(response.data.errors);
        setErrorMade(true);
      } else {
        setErrorMade(false);
        toast.success("Appointment Booked!");
        console.log(response.data.data);
      }
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setErrorMade(true);
    }
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  return (
    <div className="shadow-panelShadow p-3 lg:p-5 rounded:md">
      <div className="flex items-center justify-between">
        <p className="text-headingColor mt-0 font-semibold">Ticket Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          ${ticketPrice}
        </span>
      </div>
      <div className="mt-4">
        <p className="text-headingColor mt-0 font-semibold">General Available time slots:</p>
        <ul className="mt-3 max-h-48 overflow-y-auto">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">{item.day}</p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.startingTime} - {item.endingTime}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p className="text-headingColor mt-0 font-semibold">Taken appointment dates:</p>
        <ul className="mt-3 max-h-48 overflow-y-auto">
          {!errorMade && btnPressed && appointments?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">{formatDate(item.appointmentDate)}</p>
            </li>
          ))}

          {errorMade && btnPressed && <li>Error Getting taken appointment dates</li>}
        </ul>

        {!errorMade && btnPressed && (
          <div className="flex flex-col m-2">
            <h4 className='font-bold text-[16px]'>Choose time and date:</h4>
            <div>
              <p className="form-label">Date*</p>
              <input
                type="date"
                name="appDate"
                className="form-input"
                min={today} // Set the minimum date to today
                onChange={handleDateChange}
              />
            </div>

            <div>
              <p className="form-label">Time*</p>
              <input
                type="time"
                name="appTime"
                className="form-input"
                onChange={handleTimeChange}
              />
            </div>
          </div>
        )}
      </div>
      {!btnPressed && (
        <button
          className="btn px-2 w-full rounded-md"
          onClick={() => setBtnPressed(true)}
        >
          Show available times
        </button>
      )}
      {btnPressed && (
        <button
          className="btn px-2 w-full rounded-md"
          onClick={handleSubmit}
        >
          Book Appointment
        </button>
      )}
    </div>
  );
}
