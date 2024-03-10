import React, { useEffect, useState } from 'react';
import Myposts from './Myposts';
import { userProfile } from '../../api/Control';

export default function Profile() {
  let [show, setShow] = useState(false);
  let [data, getUser] = useState();

  let showProfile = () => {
    setShow(false);
  }

  let showPosts = () => {
    setShow(true);
  }

  let usersProfile = async () => {
    let profile = await userProfile(localStorage.getItem('userData'));
    getUser(profile.msg);
  }

  useEffect(() => {
    usersProfile();
  }, []);

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-4xl mx-auto py-8">
          <div className="border-b border-gray-200 fixed">
            <nav className="flex">
              <button onClick={showProfile} className="px-4 py-2 font-bold text-gray-800 hover:text-gray-900 focus:outline-none active:text-gray-800 border-b-2 border-transparent hover:border-gray-400 focus:border-gray-400">
                Profile
              </button>
              <button onClick={showPosts} className="px-4 py-2 font-bold text-gray-800 hover:text-gray-900 focus:outline-none active:text-gray-800 border-b-2 border-transparent hover:border-gray-400 focus:border-gray-400">
                Posts
              </button>
            </nav>
          </div>

          <div className="mt-12">
            {show ? (
              <div className="bg-white shadow-md rounded-lg p-4 mt-4">
                <h2 className="text-lg font-bold">Your Posts</h2>
                <Myposts />
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 w-full">
                <div className="text-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">User Details</h2>
                  <hr className='mx-auto w-28'/>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email:</label>
                    <p className="text-gray-800 bg-gray-200 py-2 px-3 rounded-md">{data&&data.email}</p>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="fullname">Full Name:</label>
                    <p className="text-gray-800 bg-gray-200 py-2 px-3 rounded-md">{data&&data.fullname}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
