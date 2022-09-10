import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider.jsx';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import App from './App.jsx';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

render(
  <StrictMode>
    <BrowserRouter>
      {/* <HashRouter> */}
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </AuthProvider>
      {/* </HashRouter> */}
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root'),
);