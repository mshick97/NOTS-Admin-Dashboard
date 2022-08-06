import React, { Component } from 'react';
import './styles/styles.css'
import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import Login from './components/Login.jsx'
import Dashboard from './components/Dashboard.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loginStatus: false, username: '' };
    this.successfulLogin = this.successfulLogin.bind(this);
  }

  successfulLogin(username) {
    this.setState({ loginStatus: true, username: username });
  }

  render() {
    // App.jsx:61 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'setState')
    return (
      <div id="app">
        <div id="navContainer">
          <img src={'https://uploads-ssl.webflow.com/6093315d74407812c0b3270c/60e3ac82c23b7568fcd04be0_NOTS%20Horizontal.svg'} id="notsLogo" />
          <p className='adminName'>
            Hello{this.state.username === '' ? ' Admin' : (this.state.username !== '' ? ` ${this.state.username}` : ' Admin')}!
          </p>
        </div>
        <Routes>
          <Route path='/' element={<Login onSuccess={this.successfulLogin} />} />
          <Route path='/customers' element={<Dashboard />} />
        </Routes>
        {/* {this.state.loginStatus === true ? <Dashboard /> : (this.state.loginStatus === false ? <Login onSuccess={this.successfulLogin} /> : <Dashboard />)} */}
      </div>
    )
  }
}

export default App;
