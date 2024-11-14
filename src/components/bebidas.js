// src/components/Bebidas.js
import React from 'react';
import { FaBeer, FaGlassWhiskey } from 'react-icons/fa'; // Iconos de React Icons

const Bebidas = ({ agregarAlPedido }) => {
  const bebidas = [
    { id: 1, nombre: 'Cerveza', precio: 100, icon: <FaBeer /> },
    { id: 2, nombre: 'Whiskey', precio: 80, icon: <FaGlassWhiskey /> },
    // Agrega más bebidas aquí
  ];

  return (
    <div className="w-full md:w-1/2 p-4 bg-drink rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-white mb-4">Bebidas</h2>
      <ul>
        {bebidas.map((bebida) => (
          <li key={bebida.id} className="flex justify-between items-center mb-2">
            <span className="flex items-center gap-2">
              {bebida.icon}
              {bebida.nombre} - ${bebida.precio}
            </span>
            <button
              className="bg-secondary hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded"
              onClick={() => agregarAlPedido(bebida)}
            >
              Añadir al pedido
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Bebidas;
