// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useLocation } from 'react-router-dom';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('/api/devices')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  return (
    <div>
      <h1>Device List</h1>
      <NavLink to='/user/devices/create' className="bg-gray-800 text-white font-semibold py-1 px-3 rounded-md hover:bg-gray-600 focus:outline-none ml-2">Add Device</NavLink>
      <table class="table-fixed table-auto w-full table-bordered">
        <thead>
          <tr>
          <th>Serial Number</th>
          <th>Device Name</th>
          <th>Device Type</th>
          <th>Consumption</th>
          <th>Device Description</th>
          <th>Make</th>
          <th>Model</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>LG-001</td>
            <td>Light Bulb</td>
            <td>Household</td>
            <td>150 W</td>
            <td>Regular Light Bulb</td>
            <td>CG</td>
            <td>001</td>
          </tr>
          <tr>
            <td>LG-001</td>
            <td>Light Bulb</td>
            <td>Household</td>
            <td>150 W</td>
            <td>Regular Light Bulb</td>
            <td>CG</td>
            <td>001</td>
          </tr>
          <tr>
            <td>LG-001</td>
            <td>Light Bulb</td>
            <td>Household</td>
            <td>150 W</td>
            <td>Regular Light Bulb</td>
            <td>CG</td>
            <td>001</td>
          </tr>
        </tbody>
      </table>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
