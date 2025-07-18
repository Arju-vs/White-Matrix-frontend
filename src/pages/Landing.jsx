import Header from '../components/Header'
import Footer from '../components/Footer'
import img1 from '/img2.png'
import img2 from '/img3.png'
import brainImg from '/brain.jpg'
import liverImg from '/liver.jpg'
import kidneyImg from '/kidney.jpg'
import lungsImg from '/lungs.jpg'
import heartImg from '/heart.jpg'
import stomachImg from '/stomach.jpg'
import { Link } from 'react-router-dom'
import { FaFilePrescription, FaPills, FaBolt } from 'react-icons/fa'

const Landing = () => {
  return (
    <>
      <Header />
      <div className='w-full min-h-screen bg-blue-300 pt-25 p-4'>
        <div className="relative flex flex-col lg:flex-row w-full max-w-[1400px] mx-auto items-center justify-center min-h-[500px] bg-blue-200 rounded-2xl overflow-hidden">
          <div className="flex flex-col items-start p-4 lg:p-10 lg:ms-10 w-full lg:w-1/2">
            <h1 className='text-[30px] sm:text-[40px] md:text-[50px] lg:text-[50px] xl:text-[65px] font-bold mb-[-20px] lg:mb-[-30px] text-blue-600 text-stroke cursor-pointer' style={{fontFamily:'"Alumni Sans SC", sans-serif'}}>Your HEALTH, our PRIORITY!</h1>
            <h2 className='text-[18px] sm:text-[25px] md:text-[30px] lg:text-[35px] xl:text-[30px] sm:mt-2 font-bold self-end pr-2 text-gray-900 cursor-pointer' style={{fontFamily:'"Dancing Script", cursive'}}>- we serve with CARE, for the LIVING </h2>
            <div className="flex flex-row flex-wrap gap-1 sm:gap-4 self-center mt-5">
              <img src={brainImg} alt="brain" className='w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-2xl shadow-cyan-300 cursor-pointer' />
              <img src={lungsImg} alt="lungs" className='w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-2xl shadow-cyan-300 cursor-pointer' />
              <img src={heartImg} alt="heart" className='w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-2xl shadow-cyan-300 cursor-pointer' />
              <img src={stomachImg} alt="stomach" className='w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-2xl shadow-cyan-300 cursor-pointer' />
              <img src={liverImg} alt="liver" className='w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-2xl shadow-cyan-300 cursor-pointer' />
              <img src={kidneyImg} alt="kidney" className='w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-2xl shadow-cyan-300 cursor-pointer' />
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:ms-10 mt-5 lg:mt-0">
            <img src={img1} alt="landingDoc" className='w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] object-contain' />
          </div>
        </div>
        <div className="w-full max-w-[800px] min-h-[120px] sm:h-[150px] mx-auto lg:ms-40 bg-blue-500 relative lg:absolute lg:mt-[-60px] sm:mt-[-80px] rounded-2xl overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-center p-2 sm:p-3">
            <img src={img2} alt="docAlert" className='w-20 h-20 sm:w-30 sm:h-30' />
            <div className='w-full sm:w-[500px] bg-white p-2 sm:p-4 rounded-2xl ml-0 sm:ml-4 mt-2 sm:mt-0'>
              <h1 className='self-start text-lg sm:text-xl md:text-2xl'>Create & Manage Digital Prescription Easily</h1>
              <h2 className='text-sm sm:text-base md:text-l'>Secure, fast, and print prescriptions tailored for doctors</h2>
              <div className="flex justify-center mt-1 sm:mt-2">
                <Link to={'/login'} className='bg-blue-400 px-3 sm:px-5 py-1 text-sm font-bold sm:text-base rounded-3xl me-2 sm:me-3 hover:text-blue-600 hover:bg-black'>LOGIN</Link>
                <Link to={'/register'} className='bg-blue-400 px-3 sm:px-5 py-1 text-sm font-bold sm:text-base rounded-3xl hover:text-blue-600 hover:bg-black'>SIGNUP</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[300px] bg-blue-300 py-8 px-4">
        <h1 className='text-center text-3xl sm:text-4xl md:text-5xl underline font-extrabold text-blue-800' style={{fontFamily:'"Alumni Sans SC", sans-serif'}}>Why use This Platform</h1>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-5 justify-center text-center max-w-[1200px] mx-auto">
          <div className="bg-blue-50 p-4 sm:p-6 rounded-2xl shadow transition flex-1">
            <div className="flex justify-center mb-2 sm:mb-4">
              <FaFilePrescription className="text-blue-600 text-2xl sm:text-3xl" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg text-gray-800">Print-Ready Prescriptions</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Generate well-formatted, downloadable prescriptions instantly.</p>
          </div>
          <div className="bg-blue-50 p-4 sm:p-6 rounded-2xl shadow transition flex-1">
            <div className="flex justify-center mb-2 sm:mb-4">
              <FaPills className="text-blue-600 text-2xl sm:text-3xl" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg text-gray-800">Real-Time Medical Suggestions</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Get accurate medicine name suggestions via live API as conditions.</p>
          </div>
          <div className="bg-blue-50 p-4 sm:p-6 rounded-2xl shadow transition flex-1">
            <div className="flex justify-center mb-2 sm:mb-4">
              <FaBolt className="text-blue-600 text-2xl sm:text-3xl" />
            </div>
            <h3 className="font-semibold text-base sm:text-lg text-gray-800">Secure Login System</h3>
            <p className="text-gray-600 text-xs sm:text-sm">Protected assess using JWT-based authentication for doctors only.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Landing