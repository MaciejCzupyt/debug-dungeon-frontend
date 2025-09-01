import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    vite: {
    plugins: [
      tailwindcss(),
    ],
    },
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    pages: true,
    css: ['~/assets/css/app.css'],
    modules: ['@nuxt/eslint'],
    runtimeConfig: {
        public: {
            apiBase: "http://localhost:8000/api/"
        }
    }
})