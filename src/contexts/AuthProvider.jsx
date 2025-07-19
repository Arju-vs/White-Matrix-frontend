import { createContext, useEffect, useState } from "react";
import { getUserAPI } from "../services/allAPI";

const authContext = createContext()

const AuthProvider = ({children}) => {

    const [userResponse, setUserResponse] = useState(null)

    const fetchUser = async () =>{
        const userId = sessionStorage.getItem("userId")
        if (userId) {
            try{
            const result = await getUserAPI(userId)
            setUserResponse(result.data.user)
        }catch(error){
            console.log(error);
        }
        }
        setLoading(false)
    }

    useEffect(()=>{
        fetchUser()
    },[])

  return (
    <authContext.Provider value={{userResponse, setUserResponse}}>
        {children}
    </authContext.Provider>
  )
}

export { AuthProvider, authContext}