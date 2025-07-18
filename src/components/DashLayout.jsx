import React from 'react'
import DashHeader from '../components/DashHeader'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const DashLayout = () => {
  return (
    <>
        <DashHeader />
        <div className='flex w-full min-h-screen bg-blue-200'>
            <Sidebar />
            <div className="flex-grow p-4">
                <Outlet />
            </div>
        </div>

    </>
  )
}

export default DashLayout