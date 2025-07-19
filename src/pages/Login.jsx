import React, { useContext, useState } from 'react'
import loginBg from '/loginBg.jpg'
import { FaEye,FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import img1 from '/img1.png'
import { loginAPI, registerAPI } from '../services/allAPI'
import toast from 'react-hot-toast'
import { authContext } from '../contexts/AuthProvider'

const Login = ({insideRegister}) => {

  const [inputDetails, setInputDetails] = useState({
      fName:"",
      email:"",
      regNo:"",
      password:"",
      specialty:""
    })
    console.log(inputDetails);

    const {setUserResponse} = useContext(authContext)
    
    const handleChange = (e) =>{
      setInputDetails({...inputDetails, [e.target.name] : e.target.value })
    }
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async (e) =>{
      e.preventDefault();
      const { fName, email, regNo, password, specialty} = inputDetails

      if(fName && email && regNo && password && specialty){
        try{
          const result = await registerAPI(inputDetails)
          if(result.data.success){
            const name = result.data.newUser.fName.trim().split(" ")[0]
            toast.success(`Welcome Dr. ${name}, Please Login!`)
            setTimeout(()=>{
              navigate('/login')
            setInputDetails({fName:"", email:"", regNo:"", password:"", specialty:""})
            },1000)
          }
        }catch(error){
          if (error.response?.status == 409) {
            toast.error("Email already registered!!");
          } else {
            toast.error(error.response?.data?.error || "Something went wrong");
          }
            }
          }else{
          toast.error("Please fill the form!")
        }
      }

    const handleLogin = async (e) => {
      e.preventDefault()
      const { email, password} = inputDetails
      
      if(email && password){
        try {
          const result = await loginAPI(inputDetails)
          if(result.data.success){
            sessionStorage.setItem("user",JSON.stringify(result.data.user))
            sessionStorage.setItem("userId",result.data.user._id)
            sessionStorage.setItem("token", result.data.token)
            setTimeout(()=>{
              const name = result.data.user.fName.trim().split(" ")[0]
              setUserResponse(result.data.user)
              toast.success(`Welcome Dr. ${name}`)
              navigate('/dashboard/mainPage')
              setInputDetails({email:"", password:""})
            },1000)
          }
        } catch (error) {
          if(error.response?.status == 409){
            toast.error("Invalid credentials!")
          }else{
            toast.error(error.response?.data?.error || "Something went wrong")
          }
        }
      }else{
        toast.error("Please fill the form!")
      }
    }

  return (
    <div className='w-full min-h-screen bg-cover z-10 flex items-center justify-center relative p-4' style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="h-auto lg:h-[600px] w-full max-w-[1200px] rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <div className="rounded-3xl lg:rounded-[90px] bg-gradient-to-br text-white from-cyan-500 via-blue-500 to-blue-600 opacity-90 flex flex-col justify-center p-6 lg:p-0">
          <h1 className='mt-5 lg:mt-15 font-extrabold text-2xl lg:text-3xl text-center mb-5'>
            {insideRegister ? 'Create An' : 'Login Your'} Account
          </h1>
          <form className='flex flex-col'>
            {insideRegister && (
              <div className="mx-auto lg:ms-20 rounded-lg w-full max-w-[400px]">
                <input type="text" placeholder='Full Name' name='fName' className='py-2 lg:py-3 ps-5 w-full bg-white rounded-lg focus:outline-none focus:ring-3 focus:ring-cyan-400 text-black placeholder:text-blue-600' onChange={handleChange} value={inputDetails.fName} autoComplete='off' required />
              </div>
            )}
            <div className="gap-3 w-full max-w-[400px] mx-auto">
              <div className="mt-2">
                <input type="email" placeholder='Email ID' name='email' className='py-2 lg:py-3 ps-5 w-full bg-white rounded-lg focus:outline-none focus:ring-3 focus:ring-cyan-400 text-black placeholder:text-blue-600' onChange={handleChange} value={inputDetails.email} autoComplete='off' required />
              </div>
              <div className="relative mt-2">
                <input type={showPass ? "text" : "password"} placeholder='Password' name='password' className='py-2 lg:py-3 ps-5 w-full bg-white rounded-lg focus:outline-none focus:ring-3 focus:ring-cyan-400 text-black placeholder:text-blue-600' onChange={handleChange} value={inputDetails.password} autoComplete='off' required/>
                <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-black/50 text-xl cursor-pointer' onClick={() => setShowPass(!showPass)}>{
                showPass ? <FaEye size={20} /> : <FaEyeSlash size={20} />
                }</span>
              </div>
              {insideRegister && (
                <>
                  <div className="mt-2">
                    <input type="text" placeholder='Medical Registration No.' name='regNo' className='py-2 lg:py-3 ps-5 w-full bg-white rounded-lg focus:outline-none focus:ring-3 focus:ring-cyan-400 text-black placeholder:text-blue-600' onChange={handleChange} value={inputDetails.regNo} autoComplete='off' required />
                  </div>
                  <div className="mt-2">
                    <input type="text" placeholder='Specialty' name='specialty' className='py-2 lg:py-3 ps-5 w-full bg-white rounded-lg focus:outline-none focus:ring-3 focus:ring-cyan-400 text-black placeholder:text-blue-600' onChange={handleChange} value={inputDetails.specialty} autoComplete='off' required />
                  </div>
                </>
              )}
            </div>
            <div className='flex justify-center mt-5 font-extrabold text-lg'>
              {insideRegister ? (
                <div className='flex flex-col items-center w-full'>
                  <button onClick={handleRegister} className='bg-blue-600 px-8 lg:px-[50px] py-1 rounded-full cursor-pointer w-full max-w-[200px] hover:text-black'>Sign Up</button> 
                  <h2 className='text-sm lg:text-[16px] mt-2 text-white/80 text-center'>
                    Already a member, <Link to={'/login'} className='font-bold text-black underline hover:text-white'> Log In</Link>
                  </h2>
                </div>
              ) : (
                <div className='flex flex-col items-center w-full'>
                  <button onClick={handleLogin} className='bg-blue-600 px-8 lg:px-[50px] py-1 rounded-full cursor-pointer w-full max-w-[200px] hover:text-black'>Log In</button>
                  <h2 className='text-sm lg:text-[16px] mt-2 text-white/80 text-center'>Not a member, <Link to={'/register'} className='font-bold text-black underline hover:text-white'> Sign Up</Link>
                  </h2>
                </div>
              )}
            </div>
          </form>
        </div>
        <div className="hidden lg:relative lg:flex items-center justify-center overflow-visible group">
          <div className="w-[300px] h-[300px] bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-900 rounded-[90px] rotate-44 z-0 opacity-80"></div>
          <img src={img1} alt="img1" className="absolute w-[800px] -top-5 z-20 transition-transform duration-300 ease-in-out hover:scale-110"/>
          <div className="absolute top-5 -right-40 z-30 text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-3 rounded-2xl rounded-bl-none" style={{ fontFamily: '"Edu NSW ACT Hand Pre", cursive' }}>
            Hey Doc. Lets go to work, Hurry up!
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login