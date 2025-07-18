import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <footer className="bg-blue-200 py-5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-bold">MedBOOK</h2>
          <p className="text-sm text-black/50">Well digital prescriptions for doctors!</p>
        </div>
        <div className="flex space-x-6 text-sm">
          <Link to={'/'} className="hover:text-blue-900">Home</Link>
          <a href="#" className="hover:text-blue-900">GitHub</a>
        </div>
        <div className="text-sm text-black text-center md:text-right mt-4 md:mt-0">
          © {new Date().getFullYear()} MedBook! - All rights reserved.
        </div>
        
      </div>
    </footer>
  )
}

export default Footer