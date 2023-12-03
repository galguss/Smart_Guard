import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/form.css"

function GForm({IdResident, Token, guest, type}) {
    const [LastName,setLastName] = useState(type === "create" ? '' : guest.guest_last_name);
    const [Name, setName] = useState(type === "create" ? '' : guest.guest_name);
    const [Phone, SetPhone] = useState(type === "create" ? '' : guest.phone_number);
    const [CarNum, setCarNum] = useState(type === "create" ? '' : guest.car_id);
    const navigate = useNavigate();

    function sendData(){
      let method = type === "create" ? 'POST' : 'PATCH';
      let api =  type === "create" ? 'Add' : 'Edit';
      let res = fetch('http://localhost:4000/guests/'+ api, {
          method: method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": Token
        },
        body: JSON.stringify({
          LastName,
          Name,
          Phone,
          CarNum,
          IdResident,
          IdGuest: guest.guest_id
        })

      })
    }
  return (
    <div>
        <h2>{type === "create" ? 'הוספת אורח': 'עריכת אורח'}</h2>
        <div className='form'>
            <label>:שם משפחה</label>
            <input type='text' value={LastName} onChange={e => setLastName(e.target.value)}/>
            <label>:שם פרטי</label>
            <input type='text' value={Name} onChange={e => setName(e.target.value)}/>
            <label>:מספר פלאפון</label>
            <input type='text' value={Phone} onChange={e => SetPhone(e.target.value)}/>
            <label>:מספר רכב</label>
            <input type='text' value={CarNum} onChange={e => setCarNum(e.target.value)}/>
            <button onClick={() =>{sendData(); navigate('/Profile/Guests')}}>{type === "create" ? 'הוספת אורח': 'עריכת אורח'}</button>
        </div>
    </div>
  )
}

export default GForm