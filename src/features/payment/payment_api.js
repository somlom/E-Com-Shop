import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Storage } from "../../hooks/Storage";

export const payment_api = createApi({
    reducerPath: "payment_api",
    baseQuery: fetchBaseQuery({
        baseUrl: `http://${process.env.PUBLIC_URL}/payment`,
        prepareHeaders: (headers) => {

            const token = Storage.getUserKey();

            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => "/get_orders",
            // providesTags: (result) =>
            // result ? [...result.map(({ _id }) => ({ type: 'Payment', _id })), { type: 'Payment', id: 'LIST' },] : [{ type: 'Payment', id: 'LIST' }],
            // providesTags: [{ type: 'Payment', id: 'LIST' }],
        }),
        getLastUsersOpenOrder: builder.query({
            query: () => "/get_order",
            invalidatesTags: { type: 'Payment', id: "LIST" }
        }),
        createOrder: builder.mutation({
            query: (data) => ({
                url: "/set_order",
                method: 'POST',
                body: { cart: data },
                responseType: "json",
            }),
            invalidatesTags: [{ type: 'Payment' }]
        }),
        updateOrder: builder.mutation({
            query: () => ({

            })
        })
    })
})

export const { useCreateOrderMutation, useGetOrdersQuery, useUpdateOrderMutation, useGetLastUsersOpenOrderQuery, useLazyGetLastUsersOpenOrderQuery } = payment_api;
