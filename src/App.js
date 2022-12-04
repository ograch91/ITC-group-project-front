import * as React from 'react';
import { Navbar } from './Components/Layout/Navbar/Navbar';
import "./App.css";
import { HomePage } from "./Components/Views/HomePage/HomePage"
function App() {
  return (
    <div className="App">
  <Navbar/>
    <HomePage/>
   </div>
    );
}

export default App;
