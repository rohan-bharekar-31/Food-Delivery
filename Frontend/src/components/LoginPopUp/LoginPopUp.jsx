import React, { useState ,useEffect, useContext} from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'


export const LoginPopUp = ({ setShowLogin }) => {

  
  const [currState, setCurrState] = useState("Login")
  const {url,setToken}=useContext(StoreContext)

  const [data, setData] = useState({
    userName: "",
    email: "",
    password: ""
  })

  const onChangeHandler = (e) => {
    setData((prevData) => ({
      ...prevData, [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    console.log(data)
  }, [data])
  
  const onLogin=async (event) => {
    event.preventDefault()
    let newurl=url;

    if(currState=="Login"){
      newurl=newurl+"/api/user/login"
    }
    else{
      newurl=newurl+"/api/user/register"
    }
    const response=await axios.post(newurl,data)

    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowLogin(false)
    }
    else{
      alert(response.data.message)
    }
  }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img src={assets.cross_icon} onClick={() => { setShowLogin(false) }} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Login" ? <></> : <input type="text" name='userName' value={data.userName} placeholder='Your name' required onChange={onChangeHandler} />}
          <input type="email" name='email' value={data.email} placeholder='Your email' required onChange={onChangeHandler} />
          <input type="password" name='password' value={data.password} placeholder='password' required onChange={onChangeHandler} />
        </div>
        <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, I agrre to terms & privacy policy</p>
        </div>
        {currState === "Login" ? <p>Create a new account? <span onClick={() => {
          setCurrState("Sign Up")
        }}>Click Here</span></p> : <p>Already have a  account? <span onClick={() => { setCurrState("Login") }}>Login Here</span></p>}

      </form>

    </div>
  )
}
