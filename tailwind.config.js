/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "selector",
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        container: {
            center: true,
            padding: "1rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {},
    },
    plugins: [],
};
