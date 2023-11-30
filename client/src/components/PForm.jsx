import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/form.css"


function PForm({ user, Token, CNum = '', Approvals = ''}) {
    const [CarNum, setCarNum] = useState(CNum);
    const [ApprovalsId, setApprovalsId] = useState(Approvals);
    const navigate = useNavigate();

    function sendData(){
        let method = CarNum === '' ? 'POST' : 'PATCH';
        let api =  CarNum === '' ? 'Add' : 'Edit';
        let res = fetch('http://localhost:4000/LocalCars/'+ api, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": Token
            },
            body: JSON.stringify({
                Id: user.id,
                carNum : CarNum,
                ApprovalsId
            })
        })
    }

  return (
    <div>
        <h2>{CarNum === '' ? 'הוספת רכב' : 'עריכת רכב'}</h2>
        <div className='form'>
            <label>:מספר רכב</label>
            <input type='text' max={8} value={CarNum} onChange={e => setCarNum(e.target.value)} required/>
            <button onClick={() => {sendData(); navigate('/Profile/LocalCars')}}>{CarNum === '' ? 'הוספת רכב' : 'עריכת רכב'}</button>
        </div>
    </div>
  )
}

export default PForm