import { useEffect, useState } from "react"
import axios from "axios"

import { Spinner } from '../components/other/Spinner/Spinner';
import { Storage } from "./Storage";


export const usePostData = (url = "", data = "") => {

    const [value, setValue] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const response = await axios.post(process.env.API_URL + url, data)

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

            const response = await axios.get(process.env.API_URL + url)

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

            setValue({ isLoading: true })
            await axios.get(process.env.API_URL + url, {
                headers:
                {
                    Authorization: `Bearer ${Storage.getUserKey()}`,
                    headers_list
                }
            }).then((response) => (
                setValue((prev) => ({
                    ...prev,
                    data: response.data || null,
                    isLoading: false,
                    isSuccess: response.data !== undefined && response.status === 200 ? true : false,
                    isError: response.status !== 200 ? true : false,
                    Spinner,

                }))
            ), (rejected => (
                setValue((prev) => ({ ...prev, isLoading: false, isError: true }))
            )))
        }
        
        fetchData()
    }, [url])


    return value
}

// <useGetProtectedData url = "" headers_list = "">
//  {data}
// </useGetProtectedData>

export const usePostProtectedData = (url = "", data = "", headers = "") => {

    const [value, setValue] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const response = await axios.post(process.env.API_URL + url, data, {
                headers:
                {
                    Authorization: `Bearer ${Storage.getUserKey()}`
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

export const getCart = (req) => {
    const promise = axios.post(`${process.env.API_URL}/products/cart`, { data: req }).then(({ data }) => data);

    return wrapPromise(promise);
}

function wrapPromise(promise) {
    let status = 'pending';
    let response;

    const suspender = promise.then(
        res => {
            status = 'success';
            response = res;
        },
        err => {
            status = 'error';
            response = err;
        },
    );

    const handler = {
        pending: () => {
            throw suspender;
        },
        error: () => {
            throw response;
        },
        default: () => response,
    };

    const read = () => {
        const result = handler[status] ? handler[status]() : handler.default();
        return result;
    };

    return { read };
}