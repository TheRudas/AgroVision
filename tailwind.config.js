/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agro: {
          bg:        '#3d2b1f',  // fondo principal
          surface:   '#2a1d13',  // sidebar
          card:      '#4e3728',  // superficie de cards
          accent:    '#7a5538',  // café cálido, bordes, badge pendientes
          lima:      '#e8841a',  // acento principal: botones, highlights, activos
          limaHover: '#c07a08',  // hover del acento principal
          text:      '#fdf6ec',  // texto principal
          muted:     '#c4a882',  // texto secundario
          cardLabel: '#e8c068',  // encabezados dentro de cards ("HUMEDAD DEL SUELO")
        }
      },
      fontFamily: {
        titulo: ['Nunito', 'sans-serif'],
        cuerpo: ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
