import { createContext, useEffect, useState } from "react";
import { getUserAPI } from "../services/allAPI";

const authContext = createContext()

const AuthProvider = ({children}) => {

    const [userResponse, setUserResponse] = useState(null)

    const fetchUser = async () =>{
        const userId = sessionStorage.getItem("userId")
         if (!userId) return;
        try{
            const result = await getUserAPI(userId)
            console.log(result);
            setUserResponse(result.data.user)
        }catch(error){
            console.log(error);
        }
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