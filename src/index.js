import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AlertOnAppProvider } from './Context/AlertOnAppContext';
import { UserAuthProvider } from './Context/UserAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AlertOnAppProvider>
        <UserAuthProvider>
          <App />
        </UserAuthProvider>
      </AlertOnAppProvider>
    </React.StrictMode>
  </BrowserRouter>
);
