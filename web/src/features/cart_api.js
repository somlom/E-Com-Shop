import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


export const cart_api = createApi({
    reducerPath: "cart_api",
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.API_URL}/products` }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getAll: builder.query({
            query: () => "/",
            providesTags: (result, error, arg) =>
                result ?
                    [...result.map(({ id }) => ({ type: 'Post', id })), 'Post']
                    :
                    ['Post'],
        }),
        postCart: builder.mutation({
            query: (data) => ({
                url: "/cart",
                method: 'POST',
                body: { data: data },
                responseType: "json",
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }],
        }),
        postCount: builder.mutation({
            query: (data) => ({
                url: "/check_cart",
                method: 'POST',
                body: { data: data },
                responseType: "json",
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }],
        })
    })
})

export const { usePostCartMutation, useGetAllQuery, usePostCountMutation } = cart_api;
