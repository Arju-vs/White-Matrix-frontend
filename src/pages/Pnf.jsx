import React from 'react'
import { Link } from 'react-router-dom'
import medicalTeam from '/medical-team.png'

const Pnf = () => {
  return (
    <div className="h-screen bg-blue-900 flex items-center justify-center">
      <div className="flex flex-col items-center text-center space-y-4 px-4">
        <img src={medicalTeam} alt="Medical Team" className="w-[800px] h-[400px] object-contain" />
        <h1 className="text-white text-3xl font-semibold">Looks Like You're Lost</h1>
        <p className="text-white text-lg">The page you're looking for is not available</p>
        <Link to="/" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-200">
          Go To Home
        </Link>
      </div>
    </div>
  )
}

export default Pnf
