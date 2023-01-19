import { useEffect, useState } from "react"
import axios from "axios"

import { Spinner } from '../components/other/Spinner/Spinner';
import { Storage } from "./Storage";


export const usePostData = (url = "", data = "", headers = "") => {

    const [value, setValue] = useState({ isLoading: true })

    useEffect(() => {
        const fetchData = async () => {

            await axios.post(process.env.API_URL + url, data, headers).then((response) => (
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

            await axios.get(process.env.API_URL + url, headers).then((response) => (
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

export const useGetProtectedData = (url = "", headers = "") => {

    const [value, setValue] = useState({ isLoading: true })

    useEffect(() => {
        const fetchData = async () => {

            await axios.get(process.env.API_URL + url, {
                headers:
                {
                    Authorization: `Bearer ${Storage.getUserKey()}`,
                    ...headers
                }
            }).then((response) => (
                setValue((prev) => ({
                    ...prev,
                    data: response.data || null,
                    isLoading: false,
                    isSuccess: response.data !== undefined && response.status === 200 ? true : false,
                    isError: response.status !== 200 ? true : false,
                }))
            ), (() => setValue((prev) => ({ ...prev, isLoading: false, isError: true }))))
        }

        fetchData()
    }, [url])


    return value
}

// <useGetProtectedData url = "" headers_list = "">
//  {data}
// </useGetProtectedData>

export const usePostProtectedData = (url = "", data = "", headers = "") => {

    const [value, setValue] = useState({ isLoading: true })

    useEffect(() => {
        const fetchData = async () => {
            await axios.post(process.env.API_URL + url, data, {
                headers:
                {
                    Authorization: `Bearer ${Storage.getUserKey()}`, ...headers
                }
            }).then((response) => (
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