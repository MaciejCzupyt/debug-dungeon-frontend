export const useCsrf = async () => {
    const {fetchApi} = useApi()
    if(!useCookie('csrftoken').value)
        await fetchApi(`csrf`)
}