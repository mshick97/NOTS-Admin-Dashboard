import React, { useState } from 'react';
import './styles/styles.css'
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login.jsx'
import Dashboard from './containers/MainDashboard.jsx';
import RequireAuth from './components/RequireAuth.jsx';


const App = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const successfulLogin = (user) => {
    return setUsername(user); // to display first name of admin in the nav bar
  }

  return (
    <div id="app">
      <div id="navContainer">
        <div id='homeButton' onClick={() => navigate('/overview')}>
          <img src={'https://uploads-ssl.webflow.com/6093315d74407812c0b3270c/60e3ac82c23b7568fcd04be0_NOTS%20Horizontal.svg'} id="notsLogo" />
        </div>
        <p className='adminName'>
          Hello{username === '' ? ' Admin' : (username !== '' ? ` ${username}` : ' Admin')}!
        </p>
      </div>

      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login onSuccess={successfulLogin} />} />

        {/* Protected Routes */}
        <Route path='/' element={<RequireAuth />}>
          <Route path='/*' element={<Dashboard />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;