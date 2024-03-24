import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { BsPersonFillAdd, BsPersonFill, BsArrowLeftCircle, BsBoxes } from 'react-icons/bs';
import Path from '../routes/Path';

export default function Nav() {
  const [user, setUser] = useState(localStorage.getItem('userData'));
  const location = useLocation();

  let Logout = () => {
    localStorage.removeItem('userData');
    setUser(null);
  }

  useEffect(() => {
    setUser(localStorage.getItem('userData'));
  }, [location]);

  return (
    <div className='flex flex-row'>
      <div id='sidenav' className="fixed h-screen overflow-y-auto bg-gray-800 w-64">
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="p-4 text-white">Energy Usage Monitor</div>
            <hr className='mx-auto w-24 mb-2'/>
            <ul className="text-white p-5 items-start">
              {
                !user ? (
                  <>
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
                  </>
                ) : (
                  <>
                    <li className="hover:bg-gray-700 flex items-start w-full">
                      <NavLink to='/userDash' activeClassName="bg-gray-700" className="block pt-2 pl-4 pb-2">
                        <span>
                          <BsPersonFill className="inline-block align-middle mr-2" size="1.5em"/>
                          My Dashboard
                        </span>
                      </NavLink>
                    </li> 
                    <li className="hover:bg-gray-700 flex items-start w-full">
                      <NavLink to='/user/devices' activeClassName="bg-gray-700" className="block pt-2 pl-4 pb-2">
                        <span>
                          <BsBoxes className="inline-block align-middle mr-2" size="1.5em"/>
                          Devices
                        </span>
                      </NavLink>
                    </li>
                    <li className="hover:bg-gray-700 flex items-start w-full">
                      <NavLink to='/' onClick={Logout} activeClassName="bg-gray-700" className="block pt-2 pl-4 pb-2">
                        <span>
                          <BsArrowLeftCircle className="inline-block align-middle mr-2" size="1.5em"/>
                          Logout
                        </span>
                      </NavLink>
                    </li> 
                  </>
                )
              }
            </ul>
          </div>
          <div className="text-white p-4">
            &copy; {new Date().getFullYear()} Energy Usage Monitor
          </div>
        </div>
      </div>
      <div className='ml-64 mt-6 mr-10' id='body'>
        <Path/>
      </div>
    </div>
  );
}
