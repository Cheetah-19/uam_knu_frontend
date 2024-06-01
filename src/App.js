import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Start from '../src/pages/Start';
import Login from '../src/pages/Login';
import Vertiport from '../src/pages/Vertiport';
import Result from '../src/pages/Result';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/start" element={<Start />} />
        <Route path="/vertiport" element={<Vertiport />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;
