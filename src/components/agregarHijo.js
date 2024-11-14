import React, { useState } from 'react';
import axios from 'axios';

const AgregarHijo = ({ usuario }) => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  // Verifica si usuario está definido
  if (!usuario) {
    return <p>Cargando usuario...</p>; // Muestra un mensaje hasta que usuario esté definido
  }

  const manejarSubmit = async (e) => {
    e.preventDefault();

    // Validar que se ingresaron todos los campos
    if (!nombre || !edad) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const nuevoHijo = {
      nombre,
      edad: parseInt(edad), // Asegúrate de convertir la edad a número
      usuario_id: usuario.id, // Usa el id del usuario
    };

    try {
      await axios.post('http://localhost:8080/api/usuario/hijos/create', nuevoHijo);
      setExito('Hijo agregado con éxito.');
      setNombre('');
      setEdad('');
      setError('');
    } catch (err) {
      console.error('Error al agregar el hijo:', err);
      setError('Error al agregar el hijo. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-400 to-blue-600 rounded-lg shadow-lg">
    <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b-2 border-blue-600 pb-2">Agregar Hijo</h2>
    <form onSubmit={manejarSubmit} className="space-y-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium">Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium">Edad:</label>
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          className="mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
          required
        />
      </div>
      <button
        type="submit"
        className="p-3 bg-blue-300 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-200"
      >
        Agregar Hijo
      </button>
    </form>
    {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}
    {exito && <p className="mt-4 text-green-500 font-semibold">{exito}</p>}
  </div>
);
};


export default AgregarHijo;
