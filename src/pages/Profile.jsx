
import React from 'react'
import { toast } from 'react-toastify';
import {getAuth, updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import { doc, updateDoc } from "firebase/firestore";
import {useState} from 'react'  
import {useNavigate} from 'react-router-dom'



function Profile() {

  const auth = getAuth()


  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  })

  const {name, email} = formData

  const  [changeDetails, setChangeDetails] = useState(false)

  const navigate = useNavigate();

  const onLogout = () =>{
    auth.signOut()
    navigate('/')
  }


  const onSubmit = async (e) => {
  
 
    try {
      

     
      if(auth.currentUser.displayName !== name){

         // Update user details
      await  updateProfile(auth.currentUser, {
          displayName: name
        })

        // Update firetore db  - users collection
        const usersRef = doc(db, "users", auth.currentUser.uid);

        await updateDoc(usersRef, {
          name: name
        });

        setChangeDetails(false)

      }
 
    } catch (error) {
      toast.error('Unable to edit profile')
    }

    
  }

  const onChange = (e) => {
   setFormData((prevState) => ({
    ...prevState,
    [e.target.id]: e.target.value
   }))
  }

  

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>My Profile </p>
        <button type='button' className='logOut' onClick={onLogout}>Signout</button>
       </header>

       <main>

          <div className='profileDetailsHeader'>
              <p className='profileDetailsText'>Personal Details</p>
              <p
                className='changePersonalDetails'
               onClick={() =>{
                changeDetails && onSubmit()               
                setChangeDetails((prevState) => !prevState )
               }}
              >
                {changeDetails? 'done' : 'change'}
               
              </p>
            </div>

            <div className='profileCard'>
              <form>
                <input
                  type='text'
                  id='name'
                  className={changeDetails ? 'profileNameActive' : 'profileName'}
                  disabled={!changeDetails}
                  onChange = {onChange}
                  value={name}
                 
                />
                <input
                  type='text'
                  id='email'
                  className={changeDetails ? 'profileEmailActive,' : 'profileEmail'}
                  disabled={!changeDetails}
                  onChange = {onChange}
                  value={email}
                
                />
              </form>
            </div>

       </main>

    </div>
   
  )
}

export default Profile