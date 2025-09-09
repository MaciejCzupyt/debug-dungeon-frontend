export default defineNuxtRouteMiddleware(() => {
    const { user, isLoading } = useAuth()

    // infinite loop, what could go wrong?
    while(isLoading.value)

    // redirect unauthenticated users to login page
    if (!user.value) {
        return navigateTo('/auth/log-in')
    }
})