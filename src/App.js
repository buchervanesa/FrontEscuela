
import './App.css';

// src/App.js

import Header from './components/header';
import Footer from './components/footer';
import Menu from './components/menu';
import React, { useState,useEffect } from 'react';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navBar';
import Register from './components/register';
import Dashboard from './components/dashboard';
import AdminDashboard from './components/AdminDashboard';

import LandingPage from './components/landing';
import Pedidos from './components/pedidos';
import AgregarProducto from './components/AgregarProducto';
function App() {
  // Estado del usuario
  const [usuario, setUsuario] = useState({
    id: "", 
    nombre: '',
  });


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsuario(JSON.parse(storedUser)); 
    }
  }, []);


  const agregarAlPedido = (producto) => {
   
  };


  const cerrarSesion = () => {
    localStorage.removeItem('user'); 
    setUsuario(null); 
  };

  return (
    <div className="App bg-blue-200">
      <Header />

      <Router>
        <Navbar cerrarSesion={cerrarSesion} /> {/* Pasar la función de cierre de sesión al Navbar */}
        <Routes>
        <Route path="/" element={<LandingPage/>} />
          <Route path="/landing" element={<LandingPage/>} />
          <Route path="/login" element={<Login setUsuario={setUsuario} />} /> {/* Pasar la función para establecer el usuario */}
          <Route path="/menu" element={<Menu agregarAlPedido={agregarAlPedido} usuario={usuario} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/agregarProducto" element={<AgregarProducto />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;



