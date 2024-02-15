import React from 'react'
import Home from '../user/home/Home'
import Login from '../user/authentication/Login'
import Userdash from '../user/dashboard/Userdash'
import { Routes, Route } from 'react-router-dom';
export default function Path() {
  return (
    <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path = '/userDash' element={<Userdash/>}/>
        </Routes>
  )
}
