import { useEffect, useState } from "react"
import axios from "axios"

import { Spinner } from "../components/Spinner"


export const usePostData = (url = "", data = "") => {

    const [value, setValue] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const response = await axios.post(url, data)

            setValue(await response.data)
        }
        fetchData()
    }, [url])

    return { value, Spinner }
}

export const useGetData = (url = "") => {

    const [value, setValue] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const response = await axios.get(url)

            setValue(await response.data)
        }
        fetchData()
    }, [url])

    return { value, Spinner }
}

export const useGetProtectedData = (url = "", headers_list = "") => {

    const [value, setValue] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const response = await axios.get(url, {
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("user")}`,
                    headers_list
                }
            })
            setValue(response)
        }
        fetchData()
    }, [url])

    return { st_val: value, value: value.data || null, Spinner, status: value.status }
}

export const usePostProtectedData = (url = "", data = "", headers = "") => {

    const [value, setValue] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const response = await axios.post(url, data, {
                headers:
                {
                    Authorization: `Bearer ${localStorage.getItem("user")}`
                }
                ,
                headers
            })

            setValue(await response.data)
        }
        fetchData()
    }, [url])

    return { value, Spinner }
}