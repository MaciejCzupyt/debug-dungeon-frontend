import type {User} from "~/types/user"

// const user = ref<User | null | undefined>(undefined)
const user = ref<User | null | undefined>(undefined)
const error = ref<Error | null>(null)

export const useAuth = () => {
    const {fetchApi} = useApi()

    const isLoading = computed(() => user.value === undefined)

    const login = async (username: string, password: string) => {
        try {
            await fetchApi("auth/login", {
                method: "POST",
                // csrftoken.value can be string | null, so we add a... NULLISH COALESCING OPERATOR fallback
                // (that name rolls of the tongue and is easy to remember)
                headers: {'X-CSRFToken': useCookie('csrftoken').value ?? ''},
                body: {username, password}
            })
            const fetchedUser = await fetchApi(`users/me`)

            user.value = fetchedUser
            useCookie('user').value = fetchedUser
        } catch(err: any) {
            if (err.data) {
                error.value = {
                    name: err.data.name ?? "AuthError",
                    message: err.data.detail ?? "Unexpected Authentication Error"
                }
            } else {
                error.value = err as Error
            }
        }
    }

    const logout = async () => {
        await fetchApi(`auth/logout`, {
            method: "POST",
            credentials: "include",
            headers: {"X-CSRFToken": useCookie(`csrftoken`).value ?? '',}
        })
        user.value = null
        useCookie('user').value = null
    }
    return { user, error, login, logout, isLoading }
}