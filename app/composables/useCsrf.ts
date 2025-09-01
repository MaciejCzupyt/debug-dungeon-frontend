export const useCsrf = async () => {
    const {fetchApi} = useApi()

    await fetchApi(`csrf`)
}