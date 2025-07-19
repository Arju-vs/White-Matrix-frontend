import React from 'react'
import logo from '/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='fixed top-2 left-3 right-1 w-[98%] h-auto bg-blue-200 z-50 shadow-xl shadow-cyan-500/20 rounded-xl px-4 py-2'>
      <div className="flex flex-wrap justify-between items-center">
        <div className='flex items-center gap-2'>
          <img src={logo} alt="med-logo" className='w-16 h-16' />
          <Link to='/' className='text-xl sm:text-2xl lg:text-[30px] font-bold' style={{ fontFamily: '"Alumni Sans SC", sans-serif' }}>
            med<span className='text-blue-600 text-xl sm:text-2xl lg:text-[27px]'>BOOK</span>!
          </Link>
        </div>
        <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-5 mt-2 sm:mt-0'>
          <Link to='/' className='hidden md:flex text-[16px] sm:text-[18px] text-blue-600 hover:text-black'>Home</Link>
          <Link to='/login' className='border-2 border-white text-white px-6 sm:px-10 py-1 sm:py-2 bg-gradient-to-r from-blue-500 to-blue-900 rounded-full text-lg sm:text-[20px] font-bold hover:text-black hover:border-blue-600 transition' style={{ fontFamily: '"Alumni Sans SC", sans-serif' }}>Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
