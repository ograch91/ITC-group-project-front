import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { NavigationStateProvider } from './Context/NavigationStateContext';
import App from './App';
import { AlertOnAppProvider } from './Context/AlertOnAppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AlertOnAppProvider>
        <NavigationStateProvider>
          <App />
        </NavigationStateProvider>
      </AlertOnAppProvider>
    </React.StrictMode>
  </BrowserRouter>
);
