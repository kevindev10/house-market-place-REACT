import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import { useState } from 'react';
import { toast } from 'react-toastify';

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const onChange = (e) => {
    setEmail(e.target.value)

  }

  const onSubmit = (e) =>{
    e.preventDefault()

    try {

      const auth = getAuth();
       sendPasswordResetEmail(auth, email)
       toast.success('Password reset email sent')
       navigate('/sign-in')
      
    } catch (error) {

      toast.error('Pasword reset fail, please try again')
      
    }




  }


  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange = {onChange}
           
        
          />
          <Link className='forgotPasswordLink' to='/sign-in'>
            Sign In
          </Link>

          <div className='signInBar'>
            <div className='signInText'>Send Reset Link</div>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword 