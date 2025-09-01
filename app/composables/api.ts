// unuSEd cONStant uSeaPi
export const useApi = () => {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase

    const fetchApi = <T = any>(url: string, options: any = {}): Promise<T> => {
        return $fetch(`${apiBase}${url}`, {credentials: 'include', ...options})
    }

    return {fetchApi}
}