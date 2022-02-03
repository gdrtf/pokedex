import React from 'react';
import GoogleIcon from './../images/google.png'
import GithubIcon from './../images/github.png'

export default function Login() {
  const google = () => {
    window.open("/api/auth/google","_self")
  }
  const github = () => {
    window.open("/api/auth/github","_self")
  }

  return (
      <div className='login'>
        <div className="button google" onClick={google}>
          <img src={GoogleIcon} alt="GoogleIcon" className="icon" />
          Google
        </div>
        <div className="button github" onClick={github}>
          <img src={GithubIcon} alt="GithubIcon" className="icon" />
          Github
        </div>
      </div>
  )
}