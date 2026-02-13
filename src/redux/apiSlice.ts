// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type {  OrderPayload, OrderResponse, ProductResponse, tableNumber } from "./types";

// const BASE_URL = "https://byte-backend-r4tn.onrender.com/api";

// //  const tableNumber=localStorage.getItem("tableNumber");
// //  console.log(tableNumber);
// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: BASE_URL,
//   }),
//   tagTypes: ["products", "order"],
//   endpoints: (builder) => ({
//     getProducts: builder.query<ProductResponse[], void>({
//       query: () => "/admin/products",
//       providesTags: ["products"],
//     }),    
//      getOrderedItems: builder.query<ProductResponse[], number>({
//       query: (tableNumber) => `admin/tables/number/${tableNumber}`,
//       providesTags: ["order"],
//     }),
//     placeOrder: builder.mutation<OrderResponse, OrderPayload>({
//       query: (payload) => ({
//         url: "/user/orders",
//         method: "POST",
//         body: payload,
//       }),
//       invalidatesTags: ["order"],
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   usePlaceOrderMutation,
//   useGetOrderedItemsQuery,
// } = apiSlice;
