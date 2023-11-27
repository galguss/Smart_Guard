import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/form.css"

function Register() {
    const [YishuvCode, setYishuvCode] = useState('');
    const [LastName, setLastName] = useState('');
    const [PhoneNumber, setPhoneNumber] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();
    
    function sendData() {
        fetch("http://localhost:4000/user/signUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            YishuvCode,
            LastName,
            PhoneNumber,
            Email,
            Password
          }),
        });
        navigate('/Login');
      }

  return (
    <div>
        <h2>הרשמה למערכת שומר חכם</h2>
        <div className='form'>
            <label>:קוד יישוב</label>
            <input type='text' onChange={e => setYishuvCode(e.target.value)} required />
            <label>:משפחה</label>
            <input type='text' onChange={e => setLastName(e.target.value)} required />
            <label>:פלאפון</label>
            <input type='text' onChange={e => setPhoneNumber(e.target.value)} required />
            <label>:דואר אלקטרוני</label>
            <input type='email' onChange={e => setEmail(e.target.value)} required />
            <label>:סוסמה</label>
            <input type='password' onChange={e => setPassword(e.target.value)} required />
            <button onClick={sendData}>הירשם</button>
        </div>
    </div>
  )
}

export default Register