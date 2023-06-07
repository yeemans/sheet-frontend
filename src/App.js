import { Link, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import React, {useState} from "react";
import Register from './Components/Register';
import './App.css';


function Root() {
  return (
    <div className="App">
      <div className="main-content">
        <Routes>
          <Route path="/register" element={<Register />} />
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