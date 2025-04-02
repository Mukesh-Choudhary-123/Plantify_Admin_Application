import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IP, LOCAL_SERVER, NGROK_SERVER, SERVER } from "../../constant";

export const sellerApi = createApi({
  reducerPath: "sellerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${NGROK_SERVER}/admin`,
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "true");
      return headers;
    },
  }),
  tagTypes: ['Seller'],
  endpoints: (builder) => ({
    getSellers: builder.query({
      query: () => '/seller',
      providesTags: ['Seller'],
    }),
    updateSeller: builder.mutation({
      query: ({ id, isApproved }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: { isApproved },
      }),
      invalidatesTags: ['Seller'],
    }),
  }),
});

export const { useGetSellersQuery, useUpdateSellerMutation } = sellerApi;
