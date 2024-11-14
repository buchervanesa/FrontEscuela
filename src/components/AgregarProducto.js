import React, { useState } from 'react';
import axios from 'axios';

const AgregarProducto = () => {
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar que el precio sea un número positivo
        if (parseFloat(precio) <= 0) {
            setError('El precio debe ser un número positivo.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/producto/create', {
                nombre,
                precio: parseFloat(precio),
                descripcion,
            });
            setMensaje(response.data.message);
            // Limpiar el formulario
            setNombre('');
            setPrecio('');
            setDescripcion('');
            setError(''); // Limpiar error en caso de éxito
        } catch (error) {
            console.error('Error al crear el producto:', error);
            setError('Error al crear el producto: ' + (error.response?.data?.message || ''));
            setMensaje('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-blue-600 p-8">
            <div className="bg-white shadow-md rounded-lg flex overflow-hidden max-w-4xl">
                {/* Imagen */}
                <div className="hidden md:block md:w-1/2">
                    <img
                        src="https://www.shutterstock.com/image-vector/symbol-paper-board-clipboard-report-600nw-2196540575.jpg"
                        alt="Producto"
                        className="h-full w-full object-cover"
                    />
                </div>

                {/* Formulario y Descripción */}
                <div className="w-full md:w-1/2 p-8">
                    <h2 className="text-3xl font-bold text-center mb-6 text-purple-500">
                        Crea tus productos o comidas del día
                    </h2>

                    {mensaje && (
                        <p className="text-green-500 text-center mb-4">{mensaje}</p>
                    )}

                    {error && (
                        <p className="text-red-500 text-center mb-4">{error}</p>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 mb-2"
                                htmlFor="nombre"
                            >
                                Nombre del Producto
                            </label>
                            <input
                                type="text"
                                id="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 mb-2"
                                htmlFor="precio"
                            >
                                Precio
                            </label>
                            <input
                                type="number"
                                id="precio"
                                value={precio}
                                onChange={(e) => setPrecio(e.target.value)}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                min="0.01"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 mb-2"
                                htmlFor="descripcion"
                            >
                                Descripción
                            </label>
                            <textarea
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                        >
                            Agregar Producto
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AgregarProducto;
