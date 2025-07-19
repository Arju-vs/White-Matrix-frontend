import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { presContext } from '../contexts/PresProvider'

const MyPrescription = () => {
  const navigate = useNavigate()
  const { presResponse } = useContext(presContext)

  return (
    <div className="p-4 md:p-10 bg-blue-200 w-full min-h-screen">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center mt-15 md:mt-20 sm:mt-10 text-blue-700">
        My Prescriptions
      </h2>
      
      <div className="overflow-x-auto">
        {
          presResponse && presResponse.length > 0 ? (
            <div className="bg-white md:bg-blue-200 shadow md:shadow-none overflow-hidden">
              <table className="min-w-full bg-blue-200 text-center border">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="py-2 md:py-3 px-2 md:px-4 border text-xs md:text-base">#</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 border text-xs md:text-base">Patient</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 border text-xs md:text-base">Age</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 border text-xs md:text-base hidden sm:table-cell">Gender</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 border text-xs md:text-base">Date</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 border text-xs md:text-base hidden md:table-cell">Diagnosis</th>
                    <th className="py-2 md:py-3 px-2 md:px-4 border text-xs md:text-base">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {presResponse.map((pres, index) => (
                    <tr key={pres._id} className="hover:bg-gray-100">
                      <td className="py-2 px-2 md:px-4 border text-xs md:text-base">{index + 1}</td>
                      <td className="py-2 px-2 md:px-4 border text-xs md:text-base">{pres.name}</td>
                      <td className="py-2 px-2 md:px-4 border text-xs md:text-base">{pres.age}</td>
                      <td className="py-2 px-2 md:px-4 border text-xs md:text-base hidden sm:table-cell">{pres.gender}</td>
                      <td className="py-2 px-2 md:px-4 border text-xs md:text-base">
                        {new Date(pres.date).toLocaleDateString('en-GB')}
                      </td>
                      <td className="py-2 px-2 md:px-4 border text-xs md:text-base hidden md:table-cell">
                        {pres.diagnosis}
                      </td>
                      <td className="py-2 px-2 md:px-4 border">
                        <button className="bg-blue-500 text-white px-2 md:px-3 py-1 text-xs md:text-base rounded hover:bg-blue-700 cursor-pointer" onClick={() => navigate(`/dashboard/preview/${pres._id}`)}>View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-xl text-blue-800">No prescriptions found</h2>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MyPrescription