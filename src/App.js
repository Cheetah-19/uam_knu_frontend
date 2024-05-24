import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from '../src/pages/Start';
import Login from '../src/pages/Login';
import Vertiport from '../src/pages/Vertiport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Start" element={<Start />} />
        <Route path="/vertiport" element={<Vertiport />} />
      </Routes>
    </Router>
  );
}

export default App;
