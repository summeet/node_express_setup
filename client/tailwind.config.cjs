/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                "primary-hover": "var(--primary-hover)",
                secondary: "var(--secondary)",
                background: "var(--background)",
                text: "var(--text)",
                "text-light": "var(--text-light)",
                white: "var(--white)",
                "card-bg": "var(--card-bg)",
                "glass-bg": "var(--glass-bg)",
                "glass-border": "var(--glass-border)",
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            boxShadow: {
                'glass': 'var(--shadow)',
            }
        },
    },
    plugins: [],
}
