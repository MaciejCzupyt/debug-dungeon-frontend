export default defineNuxtRouteMiddleware(() => {
    if (!useCookie('user').value) {
        return navigateTo('/auth/log-in')
    }
})