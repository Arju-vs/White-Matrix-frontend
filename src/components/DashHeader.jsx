import logo from '/logo.png'
import { Link } from 'react-router-dom' 
import { CiMail, CiBellOn } from 'react-icons/ci'
import { authContext } from '../contexts/AuthProvider'
import { useContext } from 'react'

const DashHeader = () => {
    const { userResponse } = useContext(authContext)

  return (
    <div className='top-2 left-4 fixed w-[98%] h-[70px] bg-blue-300 z-100 shadow-xl/20 shadow-cyan-500/50 rounded-xl'>
        <div className="flex justify-between items-center mx-5">
            <div className='flex'>
                <img src={logo} alt="med-logo" className='w-20 h-15 ms-5' />
                <Link to={'/dashboard/mainPage'} className='py-3 ps-2 text-[30px] font-bold' style={{fontFamily:'"Alumni Sans SC", sans-serif'}}>med<span className='text-blue-600 text-[27px]'>BOOK</span>!</Link>
            </div>
            <div className='mx-5 hidden md:flex'>
                {
                    userResponse ? 
                    <>
                    <h3 className='font-bold text-xl md:text-2xl lg:text-3xl'>
                      Welcome, <span className='text-blue-600'>Dr. {userResponse.fName.trim().split(" ")[0]}</span>
                    </h3>
                    </> : "Sir"
                }
            </div>
            <div className='flex text-center'>
                <div className='relative'>
                    <CiMail size={30} className='me-2 cursor-pointer' />
                    <div className="absolute h-3 w-3 rounded-full bg-red top-1 left-4.5 bg-red-600 text-white text-[8px] ">33</div>
                </div>
                <div className='relative'>
                    <CiBellOn size={30} className='cursor-pointer' />
                    <div className="absolute h-3 w-3 rounded-full bg-red top-1 left-4 bg-red-600 text-white text-[8px] ">10</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashHeader