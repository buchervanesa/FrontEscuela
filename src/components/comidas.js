// src/components/Comidas.js
import React from 'react';
import { FaPizzaSlice, FaHamburger } from 'react-icons/fa'; // Iconos de React Icons

const Comidas = ({ agregarAlPedido }) => {
  const comidas = [
    { id: 1, nombre: 'Pizza', precio: 200, icon: <FaPizzaSlice /> },
    { id: 2, nombre: 'Hamburguesa', precio: 150, icon: <FaHamburger /> },
    // Agrega más comidas aquí
  ];

  return (
    <div className="w-full md:w-1/2 p-4 bg-food rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Comidas</h2>
      <ul>
        {comidas.map((comida) => (
          <li key={comida.id} className="flex justify-between items-center mb-2">
            <span className="flex items-center gap-2">
              {comida.icon}
              {comida.nombre} - ${comida.precio}
            </span>
            <button
              className="bg-secondary hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded"
              onClick={() => agregarAlPedido(comida)}
            >
              Añadir al pedido
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comidas;

