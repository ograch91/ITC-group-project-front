import * as React from 'react';
import { Navbar } from './Components/Layout/Navbar/Navbar';
import { HomePage } from './Components/Views/HomePage/HomePage';
import './App.css';
import { BeforeAuthTabs } from './Components/Views/BeforeAuthTabs';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/welcome" element={<BeforeAuthTabs />} />
        <Route path="/home" element={<HomePage />} />
        {/* 👇️ redirect to dafualt when user goes to / */}
        <Route path="/" element={<Navigate to="/welcome" />} />
      </Routes>
    </div>
  );
}

export default App;
