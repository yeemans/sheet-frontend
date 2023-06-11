import { Routes, Route, BrowserRouter } from 'react-router-dom';
import React from "react";
import Home from "./Components/Home";
import Register from './Components/Register';
import Login from './Components/Login';
import Upload from "./Components/Upload";
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
          <Route path="/upload" element={<Upload />} />
          <Route path="/upload-sheet" element={<Home />} />
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