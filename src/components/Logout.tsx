import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const navigate = useNavigate();
    
    const handleLogout = () =>{
        localStorage.removeItem('token');
        navigate('/');
    }
  return (
    <button onClick={handleLogout}>logout</button>
  )
}