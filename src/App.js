import * as React from 'react';
import { Navbar } from './Components/Layout/Navbar/Navbar';
import "./App.css";
// import { HomePage } from "./Components/Views/HomePage/HomePage"
import { ProfilePage } from './Components/Views/ProfilePage/ProfilePage';
function App() {
  return (
    <div className="App">
  <Navbar/>
    {/* <HomePage/> */}
    <ProfilePage/>
   </div>
    );
}

export default App;
