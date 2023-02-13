import { useEffect, useState } from "react"
import axios from "axios"
import { Spinner } from "../Components/Other/Spinner/Spinner"


export const usePostData = (url = "", data = "", headers = "") => {

    const [value, setValue] = useState({ isLoading: true, isSuccess: false, isError: false, data: null })

    useEffect(() => {
        const fetchData = () => {
            const resp = axios.post(process.env.API_URL + url, data, headers === "" ? "" : { headers: headers })
            return resp.then((response) => (
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

export const useGetData = (url = "", headers = {}, full_url = "") => {

    const [value, setValue] = useState({ isLoading: true, isSuccess: false, isError: false, data: null })

    useEffect(() => {
        const fetchData = () => {

            if (full_url.length > 0) {
                return axios.get(process.env.API_URL + full_url, headers === "" ? "" : { headers: headers }).then((response) => (
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
            } else if (url.length > 0) {

                return axios.get(process.env.API_URL + url, headers === "" ? "" : { headers: headers }).then((response) => (
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
        }
        fetchData()
    }, [url])

    return value
}
// <useGetData url = "" headers = "">
//  {data}
// </useGetData>

export const GetTextTranslation = ({ src_lang = "", dest_lang = "", text }) => {
    const { isLoading, isSuccess, isError, data } = useGetData("", "", "https://libretranslate.de/languages")

    if (src_lang === dest_lang) {
        return text
    } else {
        if (isLoading) {
            return <Spinner />
        } else if (isError || data.length === 0) {
            return text
        } else if (isSuccess) {
            return "data"
        }
    }
}