import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const user_api = createApi({
    reducerPath: "user_api",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${process.env.PUBLIC_URL}/auth`,
        prepareHeaders: (headers) => {

            const token = localStorage.getItem("user");
            // If we have a token set in state, let's assume that we should be passing it.
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        checkToken: builder.query({
            query: () => "/check_token"
        }),
    })
})

export const { useCheckTokenQuery } = user_api;
