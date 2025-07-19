import DashMain from '../components/DashMain'
import DashProfile from '../components/DashProfile'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className='w-full min-h-screen flex items-center justify-center pt-24 md:pt-0'>
      <div className="flex flex-col md:flex-row justify-center w-full h-auto md:h-[640px] mt-2 lg:mt-20  ms-0 md:ms-50 gap-2 px-2 md:px-0">
        <div className="border w-full md:w-2/3 rounded-2xl bg-blue-300">
          <DashMain />
        </div>
        <div className={`${showProfile ? 'block' : 'hidden'} md:block border w-full md:w-1/3 rounded-2xl bg-blue-300`}>
          <DashProfile />
        </div>
      </div>
    </div>
  )
}

export default Dashboard