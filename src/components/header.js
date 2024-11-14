import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-br from-purple-400 to-blue-600 p-4 text-white text-center">
      <div className="flex items-center justify-center">
        {/* Image for the kiosk */}
        <img src="/assets/kiosco.png" alt="Kiosco Escolar" className="w-20 h-20 mr-4" />
        {/* Kiosk title */}
        <h1 className="text-2xl font-bold">Kiosco Escolar</h1>
      </div>
    </header>
  );
};

export default Header;
