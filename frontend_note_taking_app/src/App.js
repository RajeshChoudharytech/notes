import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './compontents/login'
import Register from './compontents/registration';
import NotesPage from './compontents/notes';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />                      
        <Route path="/register" element={<Register />} /> 
        <Route path="/notes" element={<NotesPage />} />  
      </Routes>
    </Router>
  );
}

export default App;
