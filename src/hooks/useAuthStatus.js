
import { useEffect, useState, useRef } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";



export const useAuthStatus = () => {
  const [isSignedIn, setIsSignedIn ] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)
 
   const isMounted = useRef(true)

 

  useEffect(() =>{
   
    if(isMounted) {

      const auth = getAuth()
      onAuthStateChanged(auth, (user) => { 
   
      if(user){
       setIsSignedIn(true)
      }
      setCheckingStatus(false)
      
  
      })

     
    }

    return () => {
      isMounted.current =false
    }



  

      

}, [isMounted])



 
  return {isSignedIn, checkingStatus}
}
