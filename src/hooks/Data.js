import { useEffect, useState } from "react"
import axios from "axios"


export const usePostData = (url = "", data = "", headers = "") => {

    const [value, setValue] = useState({ isLoading: true, isSuccess: false, isError: false, data: null })

    useEffect(() => {
        const fetchData = async () => {

            await axios.post(process.env.API_URL + url, data, headers === "" ? "" : { headers: headers }).then((response) => (
                setValue((prev) => ({
                    ...prev,
                    data: response.data || null,
                    isLoading: false,
                    isSuccess: response.data !== undefined && response.status === 200 ? true : false,
                    isError: response.status !== 200 ? true : false,
                }))
            ), (() => (
                setValue((prev) => ({ ...prev, isLoading: false, isError: true }))
            )))
        }
        fetchData()
    }, [url])

    return value
}

export const useGetData = (url = "", headers = "") => {

    const [value, setValue] = useState({ isLoading: true, isSuccess: false, isError: false, data: null })

    useEffect(() => {
        const fetchData = async () => {

            await axios.get(process.env.API_URL + url, headers === "" ? "" : { headers: headers }).then((response) => (
                setValue((prev) => ({
                    ...prev,
                    data: response.data || null,
                    isLoading: false,
                    isSuccess: response.data !== undefined && response.status === 200 ? true : false,
                    isError: response.status !== 200 ? true : false,
                }))
            ), (() => (
                setValue((prev) => ({ ...prev, isLoading: false, isError: true }))
            )))
        }
        fetchData()
    }, [url])

    return value
}
// <useGetData url = "" headers = "">
//  {data}
// </useGetData>
