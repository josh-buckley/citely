module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#36454F', // You can adjust this hex code to your preferred shade of charcoal
        citation: {
          purple: "#9b87f5",
          "purple-light": "#E5DEFF",
        }
      },
      scale: {
        '102': '1.02',
      },
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-up": {
          "0%": { 
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        }
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "float-delay": "float 3s ease-in-out 1s infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-up-delay": "fade-up 0.6s ease-out 0.3s forwards",
      }
    },
  },
  plugins: [],
}
