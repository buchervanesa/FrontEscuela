import React, { useEffect, useState } from 'react';
import AgregarHijo from './agregarHijo';
import axios from 'axios';

const Dashboard = () => {
  const [pedidos, setPedidos] = useState([]);
  const [user, setUser] = useState({});
  const [usuario, setUsuario] = useState({
    id: "", // Asignar un ID de usuario para pruebas
    nombre: '',
    saldo: 0,
  });
  const [hijos, setHijos] = useState([]); // Estado para almacenar los hijos

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsuario(parsedUser); // Guardar el usuario desde localStorage
      setUser(parsedUser); // Guardar el usuario también para mostrar en el dashboard
    }
  }, []);
  console.log(user,"user")

 

  useEffect(() => {
    const fetchPedidos = async () => {
      const response = await fetch('http://localhost:8080/api/pedido/list', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const pedidosData = await response.json();
      setPedidos(pedidosData);
    };

    fetchPedidos();
  }, []);

  // Nuevo useEffect para obtener la lista de hijos
  useEffect(() => {
    const fetchHijos = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/usuario/hijos/list/${user.id}`);
        setHijos(response.data);
      } catch (error) {
        console.error('Error al obtener los hijos:', error);
      }
    };

    if (user.id) {
      fetchHijos(); // Llamamos a la API solo si el ID del usuario está disponible
    }
  }, [user.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <h1 className="text-4xl font-extrabold text-white mb-4">¡Bienvenido, {user.nombre}!</h1>
          <p className="text-lg text-white">Tu espacio personal</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sección de saldo y datos del usuario */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 border-b-2 border-blue-800 pb-2">Saldo Disponible</h2>
            <p className="text-3xl font-bold text-green-600 ">{user.saldo} ARS</p>
            
            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4 border-b-2 border-blue-800  ">Tus Datos</h2>
            <div className="space-y-2">
              <p className="text-lg"><strong>Nombre:</strong> {user.nombre}</p>
              <p className="text-lg"><strong>Email:</strong> {user.email}</p>
            </div>

            {/* Mostrar hijos */}
            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4 border-b-2 border-blue-800 pb-2">Tus Hijos</h2>
            {hijos.length > 0 ? (
              <ul className="space-y-4">
                {hijos.map((hijo, index) => (
                  <li key={index} className="bg-blue-100 p-4 rounded-lg shadow-sm">
                    <p className="text-lg font-medium">Nombre: {hijo.nombre}</p>
                    <p className="text-sm text-gray-600">Edad: {hijo.edad}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No tienes hijos registrados.</p>
            )}

          </div>

          {/* Sección de pedidos y agregar hijo */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <AgregarHijo usuario={user} />

            {/* Pedidos */}
            <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4 border-b-2 border-gray-200 pb-2">Tus Pedidos</h2>
            {pedidos.length > 0 ? (
              <ul className="space-y-4">
                {pedidos.map((pedido, index) => (
                  <li key={index} className="flex items-center justify-between bg-blue-100 p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
                    <div>
                      <p className="text-lg font-medium">Pedido #{pedido.id}</p>
                      <p className="text-sm text-gray-600">{pedido.fecha}</p>
                    </div>
                    <div className="text-xl font-bold text-gray-700">{pedido.total} ARS</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No tienes pedidos aún.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;