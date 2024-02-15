import React from 'react';
import { NavLink } from 'react-router-dom';
import { BsPersonFillAdd, BsPersonFill } from 'react-icons/bs';
import Path from '../routes/Path';

export default function Nav() {
  return (
    <div className='flex flex-row h-screen'>
      <div id='sidenav'>
        <div className="bg-gray-800 w-64 h-screen flex flex-col justify-between">
          <div>
            <div className="p-4 text-white">Energy Usage Monitor</div>
            <hr className='mx-auto w-24 mb-2'/>
            <ul className="text-white p-5 items-start">
              <li className="hover:bg-gray-700 w-full flex items-start">
                <NavLink to='/' activeClassName="bg-gray-700" className="block pt-2 pl-4 pb-2">
                  <span>
                    <BsPersonFillAdd className="inline-block align-middle mr-2" size="1.5em"/>
                    Registration
                  </span>
                </NavLink>
              </li>
              <li className="hover:bg-gray-700 flex items-start w-full">
                <NavLink to='/login' activeClassName="bg-gray-700" className="block pt-2 pl-4 pb-2">
                  <span>
                    <BsPersonFill className="inline-block align-middle mr-2" size="1.5em"/>
                    Login
                  </span>
                </NavLink>
              </li>
              <li className="hover:bg-gray-700 flex items-start w-full">
                <NavLink to='/userDash' activeClassName="bg-gray-700" className="block pt-2 pl-4 pb-2">
                  <span>
                    <BsPersonFill className="inline-block align-middle mr-2" size="1.5em"/>
                    My Dashboard
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="text-white p-4">
            &copy; {new Date().getFullYear()} Energy Usage Monitor
          </div>
        </div>
      </div>
      <div className='ml-10 mt-6 mr-10' id='body'>
        <Path/>
      </div>
    </div>
  );
}
