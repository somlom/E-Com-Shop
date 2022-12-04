// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    items: builder.query({
      query: () => "/item",
      providesTags: ["Cart"]
    }),
    getFromServer: builder.mutation({
      query: (data) => ({
        url: "/products/cart",
        method: "POST",
        body: { data }
      }),
      invalidatesTags: ["Cart"]
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetFromServerMutation } = cartApi