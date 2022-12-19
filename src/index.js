import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AlertOnAppProvider } from './Context/AlertOnAppContext';
import { CurrentChatProvider } from './Context/CurrentChatContext';
import { MainDataProvider } from './Context/MainDataContext';
import { UserAuthProvider } from './Context/UserAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AlertOnAppProvider>
        <UserAuthProvider>
          <CurrentChatProvider>
            <MainDataProvider>
              <App />
            </MainDataProvider>
          </CurrentChatProvider>
        </UserAuthProvider>
      </AlertOnAppProvider>
    </React.StrictMode>
  </BrowserRouter>
);
