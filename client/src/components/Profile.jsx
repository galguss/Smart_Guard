import React, {useState, useEffect} from 'react'
import {  Routes, Route, Link } from 'react-router-dom';
import "../styles/profile.css"

import LocalCars from './LocalCars';
import Guests from './Guests';
import PForm from './PForm';
import GForm from './GForm';

function decodeJwt(token) {
  const base64Url = token.split('.')[1]; // Extract the payload (middle part of the token)
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace characters
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join('')); // Decode base64 and convert to JSON string

  const decoded = JSON.parse(jsonPayload); // Parse JSON to JavaScript object
  return decoded;
}

export const Context = React.createContext();

function Profile() {
  const token = localStorage.getItem('token');
  const [Item, setItem] = useState(decodeJwt(token));
  const [Type, setType] = useState('create');
  const [CObj, setCObj] = useState({});
  const [Message, setMessage] = useState({isVisible:false});
  
  useEffect(() => {
    if (Message.isVisible) {
      setTimeout(() => {
        setMessage({...Message , isVisible:false});
      }, 6000);
    }
  }, [Message]);

  return (
    <div>
        {Message.isVisible && (
        <div
          className={Message.status === 200 ? "popup success" : "popup failure"}
        >
          <p>{Message.message}</p>
        </div>
      )}
        <h2 className='tPro'><span>מושב: {Item['YishuvName']},</span><span>משפחת: {Item['lastName']}</span></h2>
        <div className='buttons'>
            <Link to={'/Profile/Guests'} className='right'>אורחים</Link><Link to={'/Profile/LocalCars'} className='left'>רכבים שלנו</Link>
        </div>
            <Context.Provider value={[Message ,setMessage]}>
              <Routes>
                  <Route path='/LocalCars' element={<LocalCars Id={Item.id} Token={token} handleEdit = {(val) => setCObj(val)} handleType ={(val) => setType(val)}/>} />
                  <Route path='/Guests' element={<Guests Id={Item.id} Token={token} handleEdit = {(val) => setCObj(val)} handleType ={(val) => setType(val)} />} />
                  <Route path='/PForm' element={<PForm user={Item} Token={token} CNum={CObj.car_number} Approvals ={CObj.approvals_id} type = {Type}/>} />
                  <Route path='/GForm' element={<GForm IdResident={Item.id} Token={token} guest = {CObj} type = {Type}/>} />
              </Routes>
            </Context.Provider>
    </div>
  )
}

export default Profile