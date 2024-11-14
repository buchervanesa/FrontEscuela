import React, { useEffect, useState } from 'react';
        import axios from 'axios';
        
        const AdminDashboard = () => {
            const [usuarios, setUsuarios] = useState([]);
            const [saldo, setSaldo] = useState({});
            const [loading, setLoading] = useState(true);
        
            // Cargar la lista de usuarios al montar el componente
            useEffect(() => {
                const fetchUsuarios = async () => {
                    try {
                        const response = await axios.get('http://localhost:8080/api/usuario/list');
                        setUsuarios(response.data);
                        setLoading(false);
                    } catch (error) {
                        console.error('Error al obtener la lista de usuarios:', error);
                    }
                };
        
                fetchUsuarios();
            }, []);
        
            // Actualizar el saldo de un usuario
            const actualizarSaldo = async (id) => {
                try {
                    const response = await axios.put(`http://localhost:8080/api/usuario/actualizar-saldo/${id}`, {
                        saldo: saldo[id],
                    });
                    alert(response.data.message);
                } catch (error) {
                    console.error('Error al actualizar el saldo:', error);
                    alert('Error al actualizar el saldo');
                }
            };
        
            // Manejar los cambios en el input del saldo
            const handleSaldoChange = (id, value) => {
                setSaldo((prevSaldo) => ({
                    ...prevSaldo,
                    [id]: value,
                }));
            };
        
            // Eliminar un usuario
            const eliminarUsuario = async (id) => {
                const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
                if (confirmar) {
                    try {
                        await axios.delete(`http://localhost:8080/api/usuario/eliminar-usuario/${id}`);
                        setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
                        alert('Usuario eliminado correctamente');
                    } catch (error) {
                        console.error('Error al eliminar el usuario:', error);
                        alert('Error al eliminar el usuario');
                    }
                }
            };
        
            if (loading) {
                return <div className="text-center">Cargando usuarios...</div>;
            }
        
            return (
                <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center p-6">
                    <div className="w-full max-w-6xl bg-white shadow-2xl rounded-lg overflow-hidden">
                        <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-600">
                            <h1 className="text-4xl font-extrabold text-white mb-6">Dashboard de Administrador</h1>
                            <p className="text-lg text-white">Gestión de Usuarios y Saldos</p>
                        </div>
        
                        <div className="p-8">
                            <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
                                <thead>
                                    <tr className="bg-gray-100 border-b-2 border-gray-300">
                                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Nombre</th>
                                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Email</th>
                                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Saldo</th>
                                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Actualizar Saldo</th>
                                        <th className="py-4 px-6 text-left font-semibold text-gray-700">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usuarios.map((usuario) => (
                                        <tr key={usuario.id} className="border-b">
                                            <td className="py-4 px-6 text-gray-800">{usuario.nombre}</td>
                                            <td className="py-4 px-6 text-gray-800">{usuario.email}</td>
                                            <td className="py-4 px-6 text-gray-800">{usuario.saldo}</td>
                                            <td className="py-4 px-6 text-gray-800">
                                                <input
                                                    type="number"
                                                    className="border border-gray-300 rounded-md p-2 w-full"
                                                    value={saldo[usuario.id] || ''}
                                                    onChange={(e) => handleSaldoChange(usuario.id, e.target.value)}
                                                    placeholder="Agregar saldo"
                                                />
                                            </td>
                                            <td className="py-4 px-6 flex space-x-4">
                                                <button
                                                    className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600"
                                                    onClick={() => actualizarSaldo(usuario.id)}
                                                >
                                                    Actualizar Saldo
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                                                    onClick={() => eliminarUsuario(usuario.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        };
        
        export default AdminDashboard;