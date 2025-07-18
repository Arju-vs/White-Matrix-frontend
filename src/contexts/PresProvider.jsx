import React, { createContext, useEffect, useState } from 'react'
import { getAllPrescriptionsAPI } from '../services/allAPI'
import toast from 'react-hot-toast'

const presContext = createContext()

const PresProvider = ({children}) => {

    const [presResponse, setPresResponse] = useState(null)
    const [refresh, setRefresh] = useState(false)

    const handleAllPrescriptions = async () =>{
      const userId = sessionStorage.getItem("userId");
      if (!userId) return;
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

  useEffect(()=>{
    handleAllPrescriptions()
  },[refresh])

  return (
    <presContext.Provider value={{presResponse, setPresResponse, setRefresh}}>
        {children}
    </presContext.Provider>
  )
}

export { PresProvider, presContext}