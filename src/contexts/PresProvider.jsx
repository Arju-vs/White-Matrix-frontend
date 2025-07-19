import React, { createContext, useContext, useEffect, useState } from 'react'
import { getAllPrescriptionsAPI } from '../services/allAPI'
import toast from 'react-hot-toast'
import { authContext } from './AuthProvider'

const presContext = createContext()

const PresProvider = ({children}) => {
    const { userResponse } = useContext(authContext)
    const [presResponse, setPresResponse] = useState(null)
    const [refresh, setRefresh] = useState(false)

    const handleAllPrescriptions = async () =>{
    try {
      const result = await getAllPrescriptionsAPI()
      if(result.data.success){
        setPresResponse(result.data.result)
      }else{
        toast.error("No Prescriptions Found!")
      }
    }catch(error){
      toast.error("Failed to load Prescription!!")
    }
  }

  useEffect(() => {
      if (userResponse?._id) { 
        handleAllPrescriptions()
      }
    }, [userResponse, refresh])

  return (
    <presContext.Provider value={{presResponse, setPresResponse, setRefresh}}>
        {children}
    </presContext.Provider>
  )
}

export { PresProvider, presContext}