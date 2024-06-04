/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Añade las rutas a tus archivos
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["light", "dark","emerald"], // Habilitar los temas claro y oscuro
  },
}
