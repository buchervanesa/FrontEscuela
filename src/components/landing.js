import React from 'react';

const LandingPage = ({ productos, realizarPedido }) => {
  return (
    <div className="font-sans">
     

     <section
  className="py-20 text-center"
  style={{
    backgroundImage: "url('https://cdn.pixabay.com/photo/2023/06/20/17/30/youtube-banner-8077450_1280.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <div className="bg-yellow-50 bg-opacity-85 p-8 rounded-lg">
    <h1 className="text-4xl font-bold text-purple-600">¡Haz tu pedido para los más pequeñitos!</h1>
    <p className="mt-4 text-xl text-gray-700">
      Controla lo que comen en sus recreos y asegúrate de que reciban comidas nutritivas y deliciosas.
    </p>
    <a
      href="/menu"
      className="mt-8 inline-block bg-gradient-to-r from-purple-400 to-blue-600 text-white py-3 px-6 rounded-full hover:from-blue-500 hover:to-purple-500 transition duration-300"
    >
      Ver Menú
    </a>
  </div>
</section>
      {/* Menú Section */}
    

      {/* Información Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-purple-400 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold">Por qué elegirnos</h2>
          <p className="mt-4 text-xl">
            Sabemos que te importa la alimentación de tus hijos. Por eso, garantizamos comidas saludables
            para que disfruten durante sus recreos.
          </p>

          <div className="mt-12 flex gap-5 flex-col md:flex-row justify-around">
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-purple-600">Alimentación Balanceada</h3>
              <p className="text-gray-600 mt-2">Menu Celiacos y Balanceados.</p>
            </div>
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-purple-600">Comida Natural</h3>
              <p className="text-gray-600 mt-2">Utilizamos solo ingredientes frescos .</p>
            </div>
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-purple-600">Variedad</h3>
              <p className="text-gray-600 mt-2">Un menú variado para cada día de la semana.</p>
            </div>
          </div>
        </div>
      </section>

   

        
    </div>
  );
};

export default LandingPage;