import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { BsBookmarkFill,BsPlusCircleFill,BsPersonFill, BsClipboard2Fill } from "react-icons/bs";
import Dash from './Dash';
import Energyusage from './Energyusage';
export default function Userdash() {
  let navigate = useNavigate();
  let user = localStorage.getItem('userData');
  let [dash,setDash] = useState(true);
  let [post,setPost] = useState(false);
  let [save,setSave] = useState(false);
  let [profile,setProfile] = useState(false)
  const Dashboard = ()=>{
    setDash(true)
    setPost(false)
    setSave(false);
    setProfile(false);
  }
  const Profile = ()=>{
    setDash(false)
    setPost(false)
    setSave(false);
    setProfile(true);
  }
  const Post = ()=>{
    setDash(false)
    setPost(true)
    setSave(false);
    setProfile(false);
  }
  const Save = ()=>{
    setDash(false)
    setPost(false)
    setSave(true);
    setProfile(false);
  }
  
  useEffect(()=>{
    !user&&navigate('/')
  })
  return (
    <>
    <div id='userControl'>
    <div class="md:h-100 rounded overflow-hidden shadow-lg md:w-[75em] mx-auto">
    <div class="px-8 py-5">
    <nav className="flex space-x-6">
  <Link to="#" onClick={Dashboard} className={`text-gray-800 font-semibold flex items-start transition-all duration-300 hover:bg-gray-800 ${dash ? 'bg-gray-800 text-white' : 'hover:text-white'} px-3 py-2 rounded-lg`}
>
    <BsClipboard2Fill className="mr-2 mt-1 text-xl" />
    Dashboard
  </Link>
  <Link to="#" onClick={Profile}className={`text-gray-800 font-semibold flex items-start transition-all duration-300 hover:bg-gray-800 ${profile ? 'bg-gray-800 text-white' : 'hover:text-white'} px-3 py-2 rounded-lg`}
>
    <BsPersonFill className="mr-2 mt-1 text-xl" />
    Profile
  </Link>
  <Link to="#" onClick={Post}className={`text-gray-800 font-semibold flex items-start transition-all duration-300 hover:bg-gray-800 ${post ? 'bg-gray-800 text-white' : 'hover:text-white'} px-3 py-2 rounded-lg`}
>
    <BsPlusCircleFill className="mr-2 mt-1 text-xl" />
    Add Posts
  </Link> 
  <Link to="#" onClick={Save} className={`text-gray-800 font-semibold flex items-start transition-all duration-300 hover:bg-gray-800 ${save ? 'bg-gray-800 text-white' : 'hover:text-white'} px-3 py-2 rounded-lg`}
>
    <BsBookmarkFill className="mr-2 mt-1 text-xl" />
    Saved
  </Link>
</nav>
  </div>
  <div className='px-4 py-2'>
  {
  dash&&<p>User Contents.</p>
  // <Energyusage/>
}
  </div>
</div>

    </div>
    </>
  )
}
