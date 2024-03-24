import React from 'react'
import Home from '../user/home/Home'
import Login from '../user/authentication/Login'
import Userdash from '../user/dashboard/Userdash'
import UserDeviceList from '../user/dashboard/DeviceList'
import AddUserDevice from '../user/devices/Create'
import Forgotpassword from '../user/authentication/Forgotpassword'
import Recoverpassword from '../user/authentication/Recoverpassword'
import { Routes, Route } from 'react-router-dom';
export default function Path() {
  return (
    <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path = '/userDash' element={<Userdash/>}/>
            <Route path = '/user/devices' element={<UserDeviceList/>}/>
            <Route path = '/user/devices/create' element={<AddUserDevice/>}/>
            <Route path = '/forgot-password' element={<Forgotpassword/>}/>
            <Route path = '/recover-password' element={<Recoverpassword/>}/>
        </Routes>
  )
}
