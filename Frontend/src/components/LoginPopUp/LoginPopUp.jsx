import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'

export const LoginPopUp = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login")
  return (
    <div className='login-popup'>
      <form className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img src={assets.cross_icon} onClick={() => { setShowLogin(false) }} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : <input type="text" placeholder='Your name' required />}
          <input type="email" placeholder='Your email' required />
          <input type="password" placeholder='password' required />
        </div>
        <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" />
          <p>By continuing, I agrre to terms & privacy policy</p>
        </div>
        {currState === "Login" ? <p>Create a new account? <span onClick={() => {
          setCurrState("Sign Up")
        }}>Click Here</span></p> : <p>Already have a  account? <span onClick={() => { setCurrState("Login") }}>Login Here</span></p>}

      </form>

    </div>
  )
}
