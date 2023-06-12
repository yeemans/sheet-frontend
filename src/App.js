import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from "react";
import Home from "./Components/Home";
import Register from './Components/Register';
import Login from './Components/Login';
import Sheet from "./Components/Sheet";
import './App.css';


function Root() {
  return (
    <div className="App">
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sheet/:sheetId" element={<Sheet />} />
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