import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductsResponse, Product } from "../../types/types";

export const getProductApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
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
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = getProductApi;
