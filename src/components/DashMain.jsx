import { useContext } from 'react'
import { authContext } from '../contexts/AuthProvider'
import docImg from '/docImg.png'
import { presContext } from '../contexts/PresProvider'
import { useNavigate } from 'react-router-dom'

const DashMain = () => {
    const { userResponse } = useContext(authContext)
    const { presResponse } = useContext(presContext)
    const navigate = useNavigate()

    return (
        <div className='w-full flex flex-col items-center p-2 md:p-0'>
            <div className="w-full md:w-[90%] bg-green-500 p-3 md:p-5 mt-2 md:mt-5 rounded-2xl">
                <div className="flex flex-col md:flex-row justify-center items-center text-center">
                    <div className="w-full md:w-2/3 mb-4 md:mb-0">
                        {
                            userResponse ?
                            <h2 className='text-xl md:text-2xl font-bold text-black/70'>Have a Good Day, <span className='text-white'>Dr. {userResponse.fName.trim().split(" ")[0]}!</span></h2>
                            : "Sir"    
                        }
                        <p className='text-sm md:text-lg text-white'>Welcome to your dashboard</p>
                    </div>
                    <div className="w-full md:w-1/3">
                        <img src={docImg} alt="docImg" className='w-40 h-40 mx-auto' />
                    </div>
                </div>
            </div>
            <h3 className='font-semibold text-xl md:text-2xl mt-3 md:mt-5'>Latest Prescriptions</h3>
            <div className="w-full overflow-x-auto">
            {
                presResponse && presResponse.length > 0 ?
                <div className="min-w-[90%] mx-5 bg-blue-200 text-center border mt-3 md:mt-5">
                    <table className="w-full">
                        <thead className="bg-blue-800 text-white">
                            <tr>
                                <th className="py-2 px-2 border text-xs md:text-base md:px-4">#</th>
                                <th className="py-2 px-2 border text-xs md:text-base md:px-4">Patient</th>
                                <th className="py-2 px-2 border text-xs md:text-base md:px-4">Age</th>
                                <th className="py-2 px-2 border text-xs md:text-base md:px-4">Gender</th>
                                <th className="py-2 px-2 border text-xs md:text-base md:px-4">Date</th>
                                <th className="py-2 px-2 border text-xs md:text-base md:px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {presResponse?.slice(0,5).map((pres, index) => (
                                <tr key={pres._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-2 border text-xs md:text-base md:px-4">{index + 1}</td>
                                    <td className="py-2 px-2 border text-xs md:text-base md:px-4">{pres.name}</td>
                                    <td className="py-2 px-2 border text-xs md:text-base md:px-4">{pres.age}</td>
                                    <td className="py-2 px-2 border text-xs md:text-base md:px-4">{pres.gender}</td>
                                    <td className="py-2 px-2 border text-xs md:text-base md:px-4">{new Date(pres.date).toLocaleDateString('en-GB')}</td>
                                    <td className="py-2 px-2 border text-xs md:text-base md:px-4">
                                        <button
                                            className="bg-blue-500 text-white px-2 py-1 text-xs md:text-base md:px-3 rounded hover:bg-blue-700 cursor-pointer" onClick={() => navigate(`/dashboard/preview/${pres._id}`)}>View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                :
                <h2 className="mt-3 md:mt-5">No prescriptions found</h2>
            }
            </div>
        </div>
    )
}

export default DashMain