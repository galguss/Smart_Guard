import React, { useState , useContext} from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/form.css"
import { Context } from "./Profile"

function GForm({IdResident, Token, guest, type}) {
    const [LastName,setLastName] = useState(IsCreate() ? '' : guest.guest_last_name);
    const [Name, setName] = useState(IsCreate() ? '' : guest.guest_name);
    const [Phone, SetPhone] = useState(IsCreate() ? '' : guest.phone_number);
    const [CarNum, setCarNum] = useState(IsCreate() ? '' : guest.car_id);
    const navigate = useNavigate();
    const [Message, setMessage] = useContext(Context);

    function IsCreate() {
      return type === "create";
    }

    async function sendData(){
      let method = IsCreate() ? 'POST' : 'PATCH';
      let api =  IsCreate() ? 'Add' : 'Edit';
      let res = await fetch('http://localhost:4000/guests/'+ api, {
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

      let data = await res.json();
      setMessage({message: data.message, status: res.status, isVisible:true})
    }
  return (
    <div>
        <h2>{IsCreate() ? 'הוספת אורח': 'עריכת אורח'}</h2>
        <div className='form'>
            <label>:שם משפחה</label>
            <input type='text' value={LastName} onChange={e => setLastName(e.target.value)}/>
            <label>:שם פרטי</label>
            <input type='text' value={Name} onChange={e => setName(e.target.value)}/>
            <label>:מספר פלאפון</label>
            <input type='text' value={Phone} onChange={e => SetPhone(e.target.value)}/>
            <label>:מספר רכב</label>
            <input type='text' value={CarNum} onChange={e => setCarNum(e.target.value)}/>
            <button onClick={() =>{sendData(); navigate('/Profile/Guests')}}>{IsCreate() ? 'הוספת אורח': 'עריכת אורח'}</button>
        </div>
    </div>
  )
}

export default GForm