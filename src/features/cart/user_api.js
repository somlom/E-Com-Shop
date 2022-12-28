import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const user_api = createApi({
    reducerPath: "user_api",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${process.env.PUBLIC_URL}/auth`,
        prepareHeaders: (headers) => {

            const token = localStorage.getItem("user");

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        checkToken: builder.query({
            query: () => "/check_token",
            // providesTags: (result) =>
            //     result ? result.map(({ id }) => ({ type: 'User', id })) : [],
        }),
    })
})

export const { useCheckTokenQuery } = user_api;
