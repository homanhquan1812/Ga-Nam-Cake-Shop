import React, { useEffect, useState } from 'react'
import { IonIcon } from '@ionic/react';
import { arrowBackOutline, close } from 'ionicons/icons';
import Head from '../component/Head'
import Script from '../component/Script'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [key, setKey] = useState('')
  const navigateTo = useNavigate()

  const loginSubmit = async (e) => {
    e.preventDefault()
  
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username: loginUsername,
        password: loginPassword
      })
  
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token)
  
        const userRole = response.data.user.role
        
        if (userRole === 'Manager' || userRole === 'Employee') {
          navigateTo('/staff')
        } else {
          navigateTo('/')
        }
      }
    } catch (error) {
      setErrorMessage('Invalid username or password.')
      console.error('Error during login:', error)
    }
  }  

  const registerSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post('http://localhost:5000/register', {
        name,
        gender,
        phonenumber,
        address,
        username,
        email,
        password,
        key
      })

      if (response.status === 400) {
        alert('Please fill in all required information.')
      } else if (response.status == 201) {
        console.log('Added a new user successfully!')
        alert('Account registered successfully, please login again.')
      } 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Please fill in all required information.')
      } else {
          console.error("Error: ", error)
      }
    }
  }

  function myFunction3() {
    var x = document.getElementById("password");
    var changeLogo = document.getElementById("changeLogo")

    if (x.type === "password") {
        x.type = "text";
        changeLogo.setAttribute('name', 'eye');
    } else {
        x.type = "password";
        changeLogo.setAttribute('name', 'eye-off');
    }
}
  function myFunction2() {
      var x = document.getElementById("pass");
      var changeLogo = document.getElementById("changeLogo2")

      if (x.type === "password") {
          x.type = "text";
          changeLogo.setAttribute('name', 'eye');
      } else {
          x.type = "password";
          changeLogo.setAttribute('name', 'eye-off');
      }
  }
  {/*
    function validateForm() {
      // Get the value from the gender input
      var genderValue = document.getElementById('gender').value.trim();

      // Check if the value is either "Male" or "Female"
      if (genderValue !== 'Male' && genderValue !== 'Female') {
          // If not valid, show an alert and prevent form submission
          alert('Please enter a valid gender (Male or Female).');
          event.preventDefault(); // Added line to prevent submission
      } else {
          var termsCheckbox = document.getElementById('termsCheckbox');
          if (termsCheckbox.checked) {
              document.getElementById('myForm').submit();
          } else {
              alert('Please agree to the Terms and Conditions.');
              event.preventDefault();
          }
      }
  }
    */}
  

  return (
    <div>
      <Head
        additionalStylesheets={[
          "/css/loginStyle.css"
      ]}
      additionalTitle={[
          "Login - Gà Nấm Cake Shop"
      ]}></Head>
      <section>
        <div className="wrapper">
            <span className="icon-close">
            <IonIcon icon={close} onClick={() => window.location.href='home'}></IonIcon>
            </span>
            <div className="button-active" style={{display: 'none'}}>
            <span className="icon-close2 login-link">
                <IonIcon icon={arrowBackOutline} />
            </span>
            </div>
            <div className="form-box login">
            <div className="form-value">
                {/* <a href="home"><span class="material-symbols-outlined" style="color: white;">arrow_back</span></a> */}
                <form action="/login/loginSubmit" method='POST'>
                <h2>Login</h2>
                <div className="inputbox">
                    <input type="username" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required />
                    <span className="icon"><IonIcon name="person" /></span>
                    <label>Username</label>
                </div>
                <div className="inputbox">
                    <input type="password" value={loginPassword}  onChange={(e) => setLoginPassword(e.target.value)} required />
                    <span className="icon"><IonIcon name="eye-off" id="changeLogo" onClick={myFunction3} /></span>
                    <label>Password</label>
                </div>
                {errorMessage && <p className="error-message" style={{ color: 'white'}}>{errorMessage}</p>}
                {/*
                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="#">Forgot Password?</a>
                </div>
                */}
                <button type="submit" name="submit" onClick={loginSubmit}>Login</button>
                <div className="registerBtn">
                    <p>Don't have an account? <a href="#" className="register-link">Click here</a></p>
                </div>
                </form>
            </div>
            </div>
            <div className="form-box register">
            <div className="form-value">
                <h2>Registration</h2>
                <form action="/login/registerSubmit" method="POST">
                {/* Left Section */}
                <div className="left-section">
                    <div className="inputbox">
                    <span className="icon"><IonIcon name="person-circle" /></span>
                    <input type="text" id="name" name="name"  value={name} onChange={(e) => setName(e.target.value)} required />
                    <label>Full Name</label>
                    </div>
                    <div className="inputbox">
                    <span className="icon"><IonIcon name="call" /></span>
                    <input type="text" id="phonenumber" name="phonenumber"  value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    <label>Phone Number</label>
                    </div>
                    <div className="inputbox">
                    <span className="icon"><IonIcon name="home" /></span>
                    <input type="text" id="address" name="address"  value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <label>Address</label>
                    </div>
                    <div className="inputbox">
                    <span className="icon"><IonIcon name="transgender" /></span>
                    <input type="text" id="gender" name="gender" placeholder="Type &quot;Male&quot; or &quot;Female&quot;." maxLength={6}  value={gender} onChange={(e) => setGender(e.target.value)} required />
                    <label>Gender</label>
                    </div>
                    <div className="inputbox">
                    <span className="icon"><IonIcon name="person" /></span>
                    <input type="username" id="username" name="username"  value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <label>Username</label>
                    </div>
                    <div className="inputbox">
                    <span className="icon"><IonIcon name="mail" /></span>
                    <input type="email" id="email" name="email"  value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <label>Email</label>
                    </div>
                    <div className="inputbox">
                    <span className="icon"><IonIcon id="changeLogo2" name="eye-off" onClick={myFunction2} /></span>
                    <input type="password" id="password" name="password"  value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <label>Password</label>
                    </div>
                    <div className="inputbox">
                    <span className="icon"><IonIcon name="mail" /></span>
                    <input type="text" id="key" name="key" placeholder='Only for staffs.'  value={key} onChange={(e) => setKey(e.target.value)} required/>
                    <label>Staff Key</label>
                    </div>
                </div>
                {/* Right Section
                    <div class="right-section">
                        <div class="inputbox">
                            <span class="icon"><IonIcon name="person"></IonIcon></span>
                            <input type="username" id="username" name="username" required>
                            <label>Username</label>
                        </div>

                        <div class="inputbox">
                            <span class="icon"><IonIcon name="mail"></IonIcon></span>
                            <input type="email" id="email" name="email" required>
                            <label>Email</label>
                        </div>

                        <div class="inputbox">
                            <span class="icon"><IonIcon name="eye"></IonIcon></span>
                            <input type="password" id="password" name="password" class="password" required>
                            <label>Password</label>
                        </div>
                    </div>
                    */}
                {/*
                <div className="remember-forgot">
                    <label><input type="checkbox" id="termsCheckbox" />I agree to the Terms and Conditions.</label>
                </div> */}
                <button type="submit" className="submit" onClick={registerSubmit}>Register</button>
                {/*
                    <div class="registerBtn">
                        <p>Already have an account? <a href="#" class="login-link">Login</a></p>
                    </div>
                    */}
                </form>
            </div>
            </div>
        </div></section>
        <Script></Script>
    </div>
  )
}

export default Login