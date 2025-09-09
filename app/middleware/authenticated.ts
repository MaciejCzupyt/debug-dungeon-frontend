export default defineNuxtRouteMiddleware(() => {
    const { user } = useAuth()

    // redirect the user to the login screen if they're not authenticated
    if (!user.value) {
        return navigateTo('/auth/log-in')
    }
})