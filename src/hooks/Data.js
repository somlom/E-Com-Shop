export const usePostData = (url = "", data = "") => {

    const [value, setValue] = React.useState(false)

    React.useEffect(() => {
        const fetchData = async () => {

            const response = await axios.post(url, { title: data })

            setValue(await response.data)
        }
        fetchData()
    }, [url])

    return value
}