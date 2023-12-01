import React, { useState } from 'react'
import LOGO from '../images/LOGO.png'
import '../styles/header.css'
import { Link } from "react-router-dom";

function Header() {
  const [isLogged, setIsLogged] = useState(localStorage.getItem('isLogged'));

  function logout(){
    localStorage.setItem('isLogged', false);
    localStorage.setItem('token', '');
    setIsLogged(false);
  }
  return (
    <header className='header'>
        <Link to={'/'}><img className='logo' src={LOGO} alt='logo'/></Link>
        <span className='nameApp'><b>Smart Guard</b></span>
        {(!isLogged) ? <span className='RL'><Link to="/Register">register</Link>/<Link to="/Login">login</Link></span> : <span className='RL'><Link onClick={logout} to={'/'}>loguot</Link></span>}
    </header>
  )
}

export default Header