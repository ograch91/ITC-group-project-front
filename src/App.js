import * as React from 'react';
import { Navbar } from './Components/Layout/Navbar/Navbar';
import { HomePage } from "./Components/Views/HomePage/HomePage"
import "./App.css";

function App() {
  return (
    <div className="App">
  <Navbar/>
    <HomePage/>
   </div>
    );
}

export default App;
