// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
    ignores: [
        'node_modules/',
        '.nuxt/',
        'dist/',
    ],
    rules: {
        // Disables Vue 2 single-root restriction
        'vue/no-multiple-template-root': 'off',
    },
})