import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NGROK_SERVER } from "../../constant";


export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${NGROK_SERVER}/admin`,
    prepareHeaders: (headers) => {
      headers.set("ngrok-skip-browser-warning", "true");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    logout: builder.mutation({
      query: (credential) => ({
        url: "/logout",
        method: "POST",
        body: credential,
      }),
    }),
  }),
});

// Export hooks generated from endpoints
export const { useLoginMutation, useLogoutMutation } = authApi;
