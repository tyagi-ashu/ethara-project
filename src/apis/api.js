import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: BASE_URL,
  //to include session cookies for user authentication in request
    credentials: 'include',
  }),
  tagTypes: ['Project'],
  endpoints: () => ({}),
});
