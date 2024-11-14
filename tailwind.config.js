/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',  // Un azul escolar bonito
        secondary: '#F5A623', // Un naranja vibrante para botones
        background: '#F7F9FB', // Fondo claro
        food: '#F765A3',  // Color para las comidas
        drink: '#67D5B5',  // Color para las bebidas
        backgroundImage: {
          'school-pattern': "url('/path/to/school-illustration.png')",
        },
      },
    },
  },
}



