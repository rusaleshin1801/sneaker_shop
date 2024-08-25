import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { ProductsResponse, Product } from "../../types/types";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://dummyjson.com",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | { url: string; method?: string; body?: {} },
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    window.location.href = "/login";
  }
  return result;
};

export const getProductApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, string | void>({
      query: (searchTerm) => {
        const queryParam = searchTerm ? `/search?q=${searchTerm}` : "";
        return `/products${queryParam}`;
      },
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
    }),
    login: builder.mutation<any, { username: string; password: string }>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          username: credentials.username,
          password: credentials.password,
          expiresInMins: 30,
        },
      }),
    }),
    getCurrentUser: builder.query<any, void>({
      query: () => ({
        url: "/auth/me",
      }),
    }),
    updateCart: builder.mutation<
      any,
      { userId: number; products: { id: number; quantity: number }[] }
    >({
      query: ({ userId, products }) => ({
        url: `/carts/${userId}`,
        method: "PUT",
        body: {
          merge: false,
          products,
        },
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useLoginMutation,
  useGetCurrentUserQuery,
  useUpdateCartMutation,
} = getProductApi;
