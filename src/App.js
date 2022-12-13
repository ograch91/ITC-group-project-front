import './App.css';
import * as React from 'react';
import { useContext } from 'react';
import { Navbar } from './Components/Layout/Navbar/Navbar';
import { HomePage } from './Components/Views/HomePage/HomePage';
import { BeforeAuthTabs } from './Components/Views/BeforeAuthTabs';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavigationStateContext } from './Context/NavigationStateContext';
import { ProfilePage } from './Components/Views/ProfilePage/ProfilePage';
import { GlobalAppAlert } from './Components/StaticElements/GlobalAppAlert';

function App() {
  const { isAuth } = useContext(NavigationStateContext);

  return (
    <div className="App">
      {isAuth && <Navbar />}
      <Routes>
        <Route path="/welcome" element={!isAuth && <BeforeAuthTabs />} />
        <Route path="/home" element={isAuth && <HomePage />} />
        <Route path="/setting" element={<ProfilePage />} />
        {/* <Route path="/setting" element={isAuth&&<Profile />} /> */}
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/home" /> : <Navigate to="/welcome" />
          }
        />
        {/* 👇️ redirect to default or possible 404 page when user goes to */}
        {/* <Route path="/*" element={isAuth?  <h2>404 page directing to HomePage</h2> :  <h2>404 page directing to to welcome Signin</h2>  } /> */}
      </Routes>
      <GlobalAppAlert />
    </div>
  );
}

export default App;
