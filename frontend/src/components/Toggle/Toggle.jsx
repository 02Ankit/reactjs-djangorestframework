import React from 'react'
import './Toggle.css'
import { FaSun, FaRegMoon } from 'react-icons/fa';
import {themeContext} from '../../Context'
import { useContext } from 'react';
const Toggle = () => {

    const theme = useContext(themeContext);
    const darkMode = theme.state.darkMode;

    const handleClick = ()=>{
        theme.dispatch({type:'toggle'})
    }
  return (
    <div className="t-toggle" onClick={handleClick}>
        <FaRegMoon/>
        <FaSun/>
        <div className="t-button"
        
        style={darkMode? {left: '2px' }:{right: '2px' }}
        >
        
        </div>
    </div>
    
  )
}

export default Toggle