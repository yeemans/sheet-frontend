import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from "react";
import Home from "./Components/Home";
import Register from './Components/Register';
import Login from './Components/Login';
import './App.css';


function Root() {
  return (
    <div className="App">
      <div className="main-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

export default App;