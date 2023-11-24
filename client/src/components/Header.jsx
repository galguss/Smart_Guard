import React from 'react'
import LOGO from '../images/LOGO.png'
import '../styles/header.css'
//import { Link } from "react-router-dom";


function Header() {
  return (
    <header className='header'>
        <img className='logo' src={LOGO} alt='logo'/>
        <span className='nameApp'><b>Smart Guard</b></span>
        <span className='RL'><a href="#">register</a>/<a href="#">login</a></span>
    </header>
  )
}

export default Header