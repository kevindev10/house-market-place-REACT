
import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../firebase.config'
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { Link, useNavigate } from 'react-router-dom'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'



function SignUp() {

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:''
  })


  const {name, email, password} = formData

  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate();

  const onChange = (e) =>{
    setFormData( (prevState) => ({
      ...prevState, 
      [e.target.id] : e.target.value
    })) 
  }



  const onsubmit = async (e) =>{
    e.preventDefault()
    try {

        const auth = getAuth();

        const userCredential = await createUserWithEmailAndPassword(auth, email, password)

        const user = userCredential.user;


        updateProfile(auth.currentUser, {
          displayName: name
        })

       const  copyOfFormData = {...formData}

       delete copyOfFormData.password

       copyOfFormData.timestamp = serverTimestamp()

    

        await setDoc(doc(db, "users", user.uid), copyOfFormData)

        navigate('/')


    } catch (error) {
      toast.error('Something went wrong with registration! Please try again. ')
    }

  }


  return (
      <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form  onSubmit={onsubmit}>
        <input
            type='text'
            className='nameInput'
            placeholder='Name'
            id='name'
            onChange = {onChange}
            value = {name}
     
          />


          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            onChange = {onChange}
            value = {email}
     
          />

          <div className='passwordInputDiv'>
            <input
              type ={showPassword? 'text' : 'password'}
              className='passwordInput' 
              placeholder='Password'
              id='password'
              onChange = {onChange}
              value={password}

             
            />

            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState) }
            
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password
          </Link>

          <div className='signUpBar'>
            <p className='signUpText'>Sign Up</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px'  />
            </button>
          </div>
        </form>

    

        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp