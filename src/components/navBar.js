import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [user, setUser] = useState(null); // Estado para el usuario logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Hook para redirección

  useEffect(() => {
    // Función para verificar el estado de login desde el localStorage
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null); // Parsear usuario del localStorage
      setIsLoggedIn(!!storedUser); // Cambiar a true si hay un usuario en localStorage
    };

    checkLoginStatus(); // Chequear el estado de login cuando se monta el componente

    // Escuchar los cambios en el localStorage (ej. cuando se inicia o cierra sesión)
    window.addEventListener('storage', checkLoginStatus);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    // Limpiar localStorage y actualizar estado
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Si tienes un token de autenticación
    setIsLoggedIn(false);
    setUser(null); // Limpiar el estado del usuario
    navigate('/landing'); // Redirigir a la página de inicio después de cerrar sesión
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md flex">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex space-x-6">
          <Link to="/landing" className="text-white hover:text-blue-300">Inicio</Link>
          <Link to="/register" className="text-white hover:text-blue-300">Registrarme</Link>
          <Link to="/menu" className="text-white hover:text-blue-300">Menú</Link>
          

          {/* Mostrar Administrador si el usuario es admin */}
          {user && user.rol === 'admin' && (
            <Link to="/AdminDashboard" className="text-white hover:text-blue-300">Administrador</Link>
           
          )}
          {/* {user && user.rol === 'admin' && ( */}
      {/* <Link to="/pedidos" className="text-white hover:text-blue-300">Pedidos</Link>      */}
        

          {/* Mostrar Mi Perfil solo si hay un usuario logueado */}
          {user && user.rol !== 'admin' && (
            <Link to="/dashboard" className="text-white hover:text-blue-300">Mi Perfil</Link>
          )}
  {user && user.rol == 'admin' && (
            <Link to="/agregarProducto" className="text-white hover:text-blue-300">Crear</Link>
          )}

{user && user.rol == 'admin' && (
            <Link to="/pedidos" className="text-white hover:text-blue-300">Pedidos</Link>
          )}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-white hover:text-blue-300">Cerrar Sesión</button>
          ) : (
            <Link to="/login" className="text-white hover:text-blue-300">Iniciar Sesión</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
