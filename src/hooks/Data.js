import React from "react"
import axios from "axios"

export const usePostData = (url = "", data = "") => {

    const [value, setValue] = React.useState(false)

    React.useEffect(() => {
        const fetchData = async () => {

            const response = await axios.post(url, data)

            setValue(await response.data)
        }
        fetchData()
    }, [url])

    return value
}

export const useGetData = (url = "") => {

    const [value, setValue] = React.useState(false)

    React.useEffect(() => {
        const fetchData = async () => {

            const response = await axios.get(url)

            setValue(await response.data)
        }
        fetchData()
    }, [url])

    return value
}