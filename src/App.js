import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Start from '../src/pages/Start';
import Login from '../src/pages/Login';
import Vertiport from '../src/pages/Vertiport';
import Result from '../src/pages/Result';
import User from '../src/pages/User';
import useSessionState from '../src/hooks/useSessionState'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user, setUser] = useSessionState("user", 0);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login user={user} setUser={setUser} />} />
          <Route path="/Start" element={<Start user={user} setUser={setUser} />} />
          <Route path="/vertiport" element={<Vertiport />} />
          <Route path="/result" element={<Result />} />
          <Route path="/user" element={<User user={user} setUser={setUser} />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
