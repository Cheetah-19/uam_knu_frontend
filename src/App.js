import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from '../src/pages/Start';
import Login from '../src/pages/Login';
import Vertiport from '../src/pages/Vertiport';
import User from '../src/pages/User';
import useSessionState from '../src/hooks/useSessionState'

function App() {
  const [user, setUser] = useSessionState("user", 0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login user={user} setUser={setUser} />} />
        <Route path="/Start" element={<Start user={user} setUser={setUser} />} />
        <Route path="/vertiport" element={<Vertiport />} />
        <Route path="/user" element={<User user={user} setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
