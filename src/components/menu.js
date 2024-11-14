import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Menu = ({ agregarAlPedido }) => {
  const [productos, setProductos] = useState([]);
  const [hijos, setHijos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedHijo, setSelectedHijo] = useState('');
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad seleccionada

  const usuarioGuardado = localStorage.getItem('user');
  const user = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/producto/list');
        console.log('Productos obtenidos:', response.data);
        setProductos(response.data);
      } catch (err) {
        console.error('Error al cargar los productos:', err);
        setError('Error al cargar los productos.');
      } finally {
        setLoading(false);
      }
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    const fetchHijos = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(`http://localhost:8080/api/usuario/hijos/list/${user.id}`);
          console.log('Hijos obtenidos:', response.data);
          setHijos(response.data);
        } catch (error) {
          console.error('Error al obtener los hijos:', error);
          setError('Error al cargar los hijos.');
        }
      }
    };

    fetchHijos();
  }, []);

  const realizarPedido = async (producto) => {
    if (!usuarioGuardado) {
      alert('Por favor, inicie sesión para realizar un pedido.');
      return;
    }

    if (!selectedHijo) {
      alert('Por favor, seleccione un hijo para realizar el pedido.');
      return;
    }

    // Cambia el objeto datosPedido para incluir la cantidad y el producto en el formato deseado
    const datosPedido = {
      usuario_id: user.id,
      hijo_id: Number(selectedHijo),
      total: producto.precio * cantidad, // Calcula el total basado en la cantidad
      productos: [
        {
          producto: producto.nombre, // Nombre del producto
          cantidad: cantidad, // Cantidad seleccionada
        },
      ],
    };

    console.log('Datos del pedido:', datosPedido);

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:8080/api/pedido/create', datosPedido, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Respuesta del pedido:', response);

      if (response.status === 201) {
        alert('Pedido realizado con éxito!');
        agregarAlPedido({ ...producto, cantidad }); // Actualiza el estado del pedido
      }
    } catch (err) {
      console.error('Error al realizar el pedido:', err);

      if (err.response && err.response.data.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert('Error al realizar el pedido. Intente nuevamente.');
      }
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8 bg-gradient-to-br from-purple-400 to-blue-600 rounded-lg shadow-lg">
      <h2 className="text-3xl font-extrabold text-center text-white mb-6">Menú Delicioso</h2>

      <div className="mb-4">
        <label htmlFor="hijo-select" className="block text-white mb-2">Seleccione un hijo:</label>
        <select
          id="hijo-select"
          className="p-2 rounded-md"
          onChange={(e) => setSelectedHijo(e.target.value)}
          value={selectedHijo}
        >
          <option value="">-- Seleccione un hijo --</option>
          {hijos.map((hijo) => (
            <option key={hijo.id} value={hijo.id}>
              {hijo.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <div key={producto.id} className="border border-gray-200 rounded-lg bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center p-4 border-b border-gray-200">
              <img src="/assets/food-restaurant.png" alt="Icono de comida" className="w-12 h-12 mr-3" />
              <h3 className="font-semibold text-xl text-blue-600">{producto.nombre}</h3>
            </div>
            <div className="p-4">
              <p className="text-gray-700 mb-2">{producto.descripcion}</p>
              <p className="text-green-500 font-bold text-lg">Precio: {producto.precio} ARS</p>
              <p className="text-gray-500">Stock: {producto.stock}</p>
              <div className="mt-4">
                <label htmlFor={`cantidad-${producto.id}`} className="block text-gray-700">Cantidad:</label>
                <input
                  type="number"
                  id={`cantidad-${producto.id}`}
                  className="border border-gray-300 p-1 rounded w-20"
                  value={cantidad}
                  min="1"
                  onChange={(e) => setCantidad(Number(e.target.value))}
                />
              </div>
            </div>
            <button
              onClick={() => realizarPedido(producto)}
              className="mb-4 rounded-md bg-gradient-to-r to-green-500 text-white font-semibold p-2 rounded hover:from-blue-600 hover:to-green-600 transition-colors duration-300"
            >
              Añadir al pedido
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;