/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Custom red color scheme based on #CC3300
        red: {
          50: '#fef2f2',   // Very light red tint for backgrounds
          100: '#fee2e2',  // Light red for subtle backgrounds
          200: '#fecaca', // Light red for borders
          300: '#fca5a5', // Medium-light red
          400: '#f87171', // Medium red
          500: '#ef4444', // Standard red
          600: '#dc2626', // Darker red
          700: '#b91c1c', // Dark red
          800: '#991b1b', // Very dark red
          900: '#7f1d1d', // Darkest red
          // Custom shades based on #CC3300
          primary: '#CC3300',     // Main brand color
          'primary-50': '#fef7f6',   // Very light tint
          'primary-100': '#fde8e4',  // Light tint
          'primary-200': '#fbd1c7',  // Lighter tint
          'primary-300': '#f7a995',  // Light tint
          'primary-400': '#f17f62',  // Medium-light tint
          'primary-500': '#e8563a',  // Medium tint
          'primary-600': '#d63920',  // Slightly darker
          'primary-700': '#CC3300',  // Base color
          'primary-800': '#a82a00',  // Darker
          'primary-900': '#8a2200',  // Much darker
        }
      }
    },
  },
  plugins: [],
}