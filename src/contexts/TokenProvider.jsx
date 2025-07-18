import React, { createContext, useEffect, useState } from 'react'
export const tokenAuth = createContext()

const TokenProvider = ({children}) => {

    const [authorisedUser, setAuthorisedUser] = useState(false)
    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            setAuthorisedUser(true)
        }else{
            setAuthorisedUser(false)
        }
    },[authorisedUser])
  return (
    <tokenAuth.Provider value={{authorisedUser, setAuthorisedUser}}>
        {children}
    </tokenAuth.Provider>
  )
}

export default TokenProvider