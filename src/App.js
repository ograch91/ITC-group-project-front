import * as React from 'react';
import { useContext } from 'react';
import { Navbar } from './Components/Layout/Navbar/Navbar';
import { HomePage } from './Components/Views/HomePage/HomePage';
import { BeforeAuthTabs } from './Components/Views/BeforeAuthTabs';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { NavigationStateContext } from './Context/NavigationStateContext';

function App() {
 
  const{isAuth}=useContext(NavigationStateContext);

  return (
    <div className="App">
    {isAuth && <Navbar/>}
      <Routes>
        <Route path="/welcome" element={<BeforeAuthTabs />} />
        <Route path="/home" element={<HomePage />} />
        {/* 👇️ redirect to default when user goes to / */}
        <Route path="/" element={<Navigate to="/welcome" />} />
      </Routes>
    </div>
  );
}

export default App;
