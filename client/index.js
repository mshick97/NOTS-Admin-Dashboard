import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App.jsx';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

render(
  <StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </StrictMode>,
  document.getElementById('root'),
);