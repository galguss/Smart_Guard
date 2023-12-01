import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/form.css"


function PForm({ user, Token, CNum = '', Approvals = '', type}) {
    const [CarNum, setCarNum] = useState(type === "create" ? '' : CNum);
    const navigate = useNavigate();
    
    function sendData(){
        let method = type === "create" ? 'POST' : 'PATCH';
        let api =  type === "create" ? 'Add' : 'Edit';
        let res = fetch('http://localhost:4000/LocalCars/'+ api, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": Token
            },
            body: JSON.stringify({
                Id: user.id,
                carNum : CarNum,
                ApprovalsId: Approvals
            })
        })
    }

  return (
    <div>
        <h2>{type === "create" ? 'הוספת רכב' : 'עריכת רכב'}</h2>
        <div className='form'>
            <label>:מספר רכב</label>
            <input type='text' max={8} value={CarNum} onChange={e => setCarNum(e.target.value)} required/>
            <button onClick={() => {sendData(); navigate('/Profile/LocalCars')}}>{type === "create" ? 'הוספת רכב' : 'עריכת רכב'}</button>
        </div>
    </div>
  )
}

export default PForm