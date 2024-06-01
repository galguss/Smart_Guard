import React, { useState } from 'react'
import LOGO from '../images/LOGO.png'
import '../styles/header.css'
import { Link } from "react-router-dom";

function Header() {
  const [isLogged, setIsLogged] = useState(Boolean(localStorage.getItem('isLogged')));

  function logout(){
    localStorage.clear();
    setIsLogged(false);
  }
  
  return (
    <header className='header'>
      <div className='containerHeader'>
        <div className='LOGEC'>
          <Link to={'/'}><img className='logo' src={LOGO} alt='logo'/></Link>
          <span className='nameApp'><b>Smart Guard</b></span>
          </div>
          {(isLogged) ? <span className='RL'><Link onClick={logout} to={'/'}>loguot</Link></span> : <span className='RL'><Link to="/Register">register</Link>/<Link to="/Login">login</Link></span>}
        </div>
    </header>
  )
}

export default Header