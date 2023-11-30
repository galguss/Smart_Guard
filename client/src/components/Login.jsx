import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/form.css"

function Login() {
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const navigate = useNavigate();

    async function sendData() {
       let res = await fetch("http://localhost:4000/user/signIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email,
            Password
          }),
        });
        let data = await res.json();
    
        localStorage.setItem('token', data.token);
        if(data.token != ''){
            localStorage.setItem('isLogged', true);
            navigate('/Profile');
        }  
      }
  return (
    <div>
        <h2>כניסה למערכת</h2>
        <div className='form'>
            <label>:דואר אלקטרוני</label>
            <input type='email' onChange={e => setEmail(e.target.value) } required />
            <label>:סיסמה</label>
            <input type='password' onChange={e => setPassword(e.target.value)} required />
            <button onClick={sendData}>התחבר</button>
        </div>
    </div>
  )
}

export default Login