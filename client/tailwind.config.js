/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Deep blue for professional look
        secondary: '#3B82F6', // Lighter blue for accents
        accent: '#10B981', // Green for success/buttons
        background: '#F1F5F9', // Light gray for background
        darkBg: '#1F2937', // Dark mode background
        card: '#FFFFFF', // White for cards
        darkCard: '#374151', // Dark mode cards
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      backdropBlur: {
        'glass': '10px',
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Enable dark mode with class toggle
}