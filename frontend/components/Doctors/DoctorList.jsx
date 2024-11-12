import { useState } from 'react'
import { doctors } from "../../assets/data/doctors";
import DoctorCard from "./DoctorCard";

export default function DoctorList() {
  const [errorMade, setErrorMade] = useState(false)
  return (
    <div>
      {
        !errorMade && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            {doctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )
      }

      { errorMade && <div>Error getting doctors. Try again!</div>}

    </div>
    
  )
}
