import * as React from 'react';
import { Navbar } from './Components/Layout/Navbar/Navbar';
import { HomePage } from "./Components/Views/HomePage/HomePage"
import "./App.css";
// import { ProfilePage } from './Components/Views/ProfilePage/ProfilePage';
function App() {
  return (
    <div className="App">
  <Navbar/>
    <HomePage/>
    {/* <ProfilePage/> */}
   </div>
    );
}

export default App;
