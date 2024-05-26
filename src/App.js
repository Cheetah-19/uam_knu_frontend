import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Start from '../src/pages/Start';
import Login from '../src/pages/Login';
import Vertiport from '../src/pages/Vertiport';
import User from '../src/pages/User';
import { useCookies } from 'react-cookie';
import useSessionState from '../src/hooks/useSessionState'

function App() {
  const [cookies, setCookie] = useCookies();
  const [user, setUser] = useSessionState('user', 0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login cookies={cookies} setCookie={setCookie} user={user} setUser={setUser} />} />
        <Route path="/Start" element={<Start cookies={cookies} setCookie={setCookie} user={user} setUser={setUser} />} />
        <Route path="/vertiport" element={<Vertiport />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;
