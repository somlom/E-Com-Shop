import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const cart_api = createApi({
    reducerPath: "cart_api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000/products" }),
    tagTypes: ['Cart'],
    endpoints: (builder) => ({
        getAll: builder.query({
            query: () => "/"
        }),
        postCart: builder.mutation({
            query: (data) => ({
                url: "/cart",
                method: 'POST',
                // credentials: 'include',
                body: { data: data },
                responseType: "json",
            }),
            // transformResponse: (response, meta, arg) => response.data,
            // transformErrorResponse: (response, meta, arg) => response.status,
            invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
        })
    })
})

export const { usePostCartMutation, useGetAllQuery } = cart_api;

// export const cart_api = createApi({
//     reducerPath: "cart_api",
//     baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
//     endpoints: (builder) => ({
//         postCart: builder.mutation({
//             query: ({data}) => ({
//                 url: `products/cart`,
//                 method: 'POST',
//                 body: data,
//             })
//         })
//     })
// })

// export const { usePostCartMutation } = cart_api;