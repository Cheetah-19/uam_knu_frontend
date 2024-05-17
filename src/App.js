import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from '../src/pages/Start';
import Login from '../src/pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
