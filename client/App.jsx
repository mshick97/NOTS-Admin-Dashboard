import React, { useContext } from 'react';
import './styles/styles.css'
import AuthContext from './context/AuthProvider.jsx';
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './components/Login.jsx'
import Dashboard from './containers/MainDashboard.jsx';
import RequireAuth from './components/RequireAuth.jsx';


const App = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div id="app">
      <div id="navContainer">
        <div id='homeButton' onClick={() => navigate('/overview')}>
          <img src={'https://uploads-ssl.webflow.com/6093315d74407812c0b3270c/60e3ac82c23b7568fcd04be0_NOTS%20Horizontal.svg'} id="notsLogo" />
        </div>
        <p className='adminName'>
          Hello {auth.firstName}!
        </p>
      </div>

      <Routes>
        {/* Public Routes */}
        <Route path='/login' element={<Login />} />

        {/* Protected Routes */}
        <Route path='/' element={<RequireAuth />}>
          <Route path='/*' element={<Dashboard />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;