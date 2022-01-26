import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";

import './App.css'

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:3001/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-credentials": true
        }
      }).then(response => {
        if (response.status === 200) return response.json()
        throw new Error("Authentication has failed!")
      }).then(resObject => {
        setUser(resObject.user)
      }).catch(err => {
        console.log(err);
      })
    }
    getUser()
  }, [])

  console.log(user);

  return (
    <BrowserRouter>
      <div>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;