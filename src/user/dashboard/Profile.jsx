import React, { useState } from 'react'
import Myposts from './Myposts';

export default function Profile() {
  let [show,setShow] = useState(false)
  let Showprofile = ()=>{
    setShow(false);
  }
  let Showposts = ()=>{
    setShow(true)
  }
  return (
    <>
    <div className="bg-gray-100 min-h-screen">
    <div className="max-w-4xl mx-auto py-8">
        <div className="border-b border-gray-200 fixed">
            <nav className="flex">
                <button onClick={Showprofile} className="px-4 py-2 font-bold text-gray-800 hover:text-gray-900 focus:outline-none active:text-gray-800 border-b-2 border-transparent hover:border-gray-400 focus:border-gray-400">
                    Profile
                </button>
                <button onClick={Showposts} className="px-4 py-2 font-bold text-gray-800 hover:text-gray-900 focus:outline-none active:text-gray-800 border-b-2 border-transparent hover:border-gray-400 focus:border-gray-400">
                    Posts
                </button>
            </nav>
        </div>

        <div className="mt-12">
          {show?(
            <>
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                    <h2 className="text-lg font-bold">Your Posts</h2>
                    <Myposts/>
                </div>
            </>
          ):(
            <>
             <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="text-lg font-bold">Your Profile</h2>
                </div>
            </>
          )}
        </div>
    </div>
</div>

    </>
  )
}
