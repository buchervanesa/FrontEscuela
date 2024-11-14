import { useState, useEffect } from "react";
import axios from "axios";

const Pedidos = () => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const obtenerPedidos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/pedido/list');
                setPedidos(response.data);
            } catch (err) {
                setError('Error al cargar los pedidos.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        obtenerPedidos();
       
    }, []);

    if (loading) return <p>Cargando pedidos...</p>;
    if (error) return <p>{error}</p>;

    // Agrupar productos por pedido_id
    const pedidosAgrupados = pedidos.reduce((acc, pedido) => {
        const { pedido_id, usuario, hijo, producto, cantidad, total } = pedido;

        // Filtrar productos nulos
        if (producto !== null && cantidad !== null) {
            // Si no existe el pedido, lo inicializamos
            if (!acc[pedido_id]) {
                acc[pedido_id] = {
                    usuario,
                    hijo,
                    productos: [],
                    total: 0
                };
            }
            // Añadir el producto al pedido
            acc[pedido_id].productos.push({ producto, cantidad });
            // Sumar el total del pedido
            acc[pedido_id].total = total; // Si el total es enviado desde el backend
        }

        return acc;
    }, {});

    return (
        <div className="min-h-screen flex justify-center bg-gradient-to-br from-purple-400 to-blue-600">
            <div className="rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
                <h2 className="text-4xl font-extrabold text-center text-gray-800 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4">
                    Lista de Pedidos
                </h2>
                <table className="min-w-full border-collapse bg-white">
                    <thead>
                        <tr className="bg-purple-200 text-gray-800">
                            <th className="border border-gray-300 p-3">Nombre del Padre</th>
                            <th className="border border-gray-300 p-3">Nombre del Hijo</th>
                            <th className="border border-gray-300 p-3">Total del Pedido</th>
                            <th className="border border-gray-300 p-3">Detalles del Pedido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(pedidosAgrupados).map(([pedido_id, { usuario, hijo, total, productos }]) => (
                            <tr key={pedido_id} className="hover:bg-blue-50 transition-colors duration-300">
                                <td className="border border-gray-300 p-3">{usuario}</td>
                                <td className="border border-gray-300 p-3">{hijo}</td>
                                <td className="border border-gray-300 p-3">{total} ARS</td>
                                <td className="border border-gray-300 p-3">
                                    {productos.map((producto, index) => (
                                        <div key={index}>
                                            {producto.cantidad} x {producto.producto}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Pedidos;
