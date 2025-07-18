import { CgProfile } from "react-icons/cg";
import profileImg from '/profile.png'
import { SlCalender } from "react-icons/sl";
import Calendar from 'react-calendar'
import { useContext, useState } from "react";
import '../styles/Calender.css'
import { authContext } from "../contexts/AuthProvider";

const DashProfile = () => {

    const [date, setDate] = useState(new Date())
    const { userResponse } = useContext(authContext)
    
  return (
    <div className='w-full flex flex-col justify-center items-center'>
        <span className='w-[90%] bg-blue-800 p-3 mt-5 flex flex-row justify-center text-white text-center text-xl font-bold rounded-2xl shadow'>
            <CgProfile size={30} className="me-1" /> My Profile
        </span>
        <div className="w-[90%] bg-blue-400 mt-1 p-3 rounded-2xl flex flex-row">
            <img src={profileImg} alt="profile" className="w-25 h-25 ms-5 mt-2" />
            <div className="flex flex-col">
                {
                    userResponse ? 
                        <>
                            <h1 className="font-bold text-xl ps-2 pt-2">Dr. {userResponse.fName}</h1>
                            <h3 className="font-medium text-sm ps-2 -pt-2 "> {userResponse.specialty}</h3>
                            <h3 className="font-bold text-sm ps-2 pt-2">Email: {userResponse.email}</h3>
                            <h3 className="font-bold text-sm ps-2 pt-2">Med ID: {userResponse.regNo}</h3>
                        </>
                        :
                        <div className=""></div>
                }
            </div>
        </div>
        <span className='w-[90%] bg-blue-800 p-3 mt-5 flex flex-row justify-center text-white text-center text-xl font-bold rounded-2xl shadow'>
            <SlCalender size={30} className="me-1 pb-1" /> My Calender
        </span>
        <div className="w-[90%] bg-blue-400 mt-1 p-5 rounded-2xl flex justify-center overflow-hidden">
            <div className="bg-white shadow-lg inline-block">
                <Calendar onChange={setDate} value={date} />
            </div>
        </div>

    </div>
  )
}

export default DashProfile