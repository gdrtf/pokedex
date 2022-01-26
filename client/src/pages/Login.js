import React from 'react';
import GoogleIcon from './../images/google.png'

export default function Login() {
  const google = () => {
    window.open("http://localhost:3001/auth/google","_self")
  }

  return (
    <div className='login'>
      <div className="button google" onClick={google}>
        <img src={GoogleIcon} alt="GoogleIcon" className="icon" />
        Google
      </div>
    </div>
  )
}