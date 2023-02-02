import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const cart_api = createApi({
    reducerPath: "cart_api",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}/products` }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getAll: builder.query({
            query: () => "/",
        }),
        postCart: builder.mutation({
            query: (data) => ({
                url: "/cart",
                method: 'POST',
                body: { data: data },
                responseType: "json",
            }),
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
        })
    })
})

export const { usePostCartMutation, useGetAllQuery } = cart_api;
