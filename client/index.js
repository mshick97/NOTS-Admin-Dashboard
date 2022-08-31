import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';
import App from './App.jsx';

render(
  <HashRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HashRouter>,
  document.getElementById('root'),
);