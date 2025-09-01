const user = ref(null)
const error = ref<Error | null>(null)

export const useAuth = () => {
    const {fetchApi} = useApi()

    const login = async (username: string, password: string) => {
        try {
            await fetchApi("auth/login", {
                method: "POST",
                credentials: "include",
                // csrftoken.value can be string | null, so we add a... NULLISH COALESCING OPERATOR fallback
                // (that name rolls of the tongue and is easy to remember)
                headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
                body: {username, password}
            })

            user.value = await fetchApi(`users/me`)
        } catch(err) {
            error.value = err as Error
        }
    }


    const logout = async () => {
        await fetchApi(`auth/logout`, {
            method: "POST",
            credentials: "include",
            headers: {"X-CSRFToken": useCookie(`csrftoken`).value ?? '',}
        })
        user.value = null
    }
    return { user, error, login, logout }
}