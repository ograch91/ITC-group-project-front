import * as React from 'react';
import { useContext } from 'react';
import { Navbar } from './Components/Layout/Navbar/Navbar';
import { HomePage } from './Components/Views/HomePage/HomePage';
import { BeforeAuthTabs } from './Components/Views/BeforeAuthTabs';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { NavigationStateContext } from './ContextProviders/NavigationStateContext';
import { ProfileDetails } from './Components/Profile/ProfileDetails';
import { ProfileDetailsLoader } from './Components/APILoaded/ProfileDetailsLoader';
import { ProfilePage } from './Components/Views/ProfilePage/ProfilePage';

function App() {
 
  const{isAuth}=useContext(NavigationStateContext);
  console.log("isAuth",isAuth);
  return (
    <div className="App">
    {isAuth && <Navbar/>}
      <Routes>
        <Route path="/welcome" element={!isAuth&&<BeforeAuthTabs />} />
        <Route path="/home" element={isAuth&&<HomePage />} />
        <Route path="/setting" element={<ProfilePage/>} />
        {/* <Route path="/setting" element={isAuth&&<Profile />} /> */}
        <Route path="/" element={isAuth? <Navigate to="/home" /> : <Navigate to="/welcome" /> } />
        {/* 👇️ redirect to default or possible 404 page when user goes to */}
        {/* <Route path="/*" element={isAuth?  <h2>404 page directing to HomePage</h2> :  <h2>404 page directing to to welcome Signin</h2>  } /> */}
      </Routes>
    </div>
  );
}

export default App;
