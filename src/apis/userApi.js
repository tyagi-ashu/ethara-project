import {api} from './api';
import {setUser, logout} from '../features/userSlice';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({

    register: builder.mutation({
      query: (userData) => ({
        url: 'users/register',
        method: 'POST',
        body: userData,
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        const {data} = await queryFulfilled;
        dispatch(setUser(data.user));
      },
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try{
          const {data} = await queryFulfilled;
          dispatch(setUser(data.user));
        }catch{
          console.log('login failed');
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        await queryFulfilled;
        dispatch(logout());
      },
    }),

    getMe: builder.query({
      query: () => 'users/me',
      async onQueryStarted(_, {dispatch, queryFulfilled}) {
        try{
          const {data} = await queryFulfilled;
          dispatch(setUser(data.user));
        }catch{
          console.log('Not authenticated');
        }
      }
    }),
    getUsers: builder.query({
      query: () => 'users/show'
    })
  })
})

export const {useRegisterMutation, useLoginMutation,
useLogoutMutation, useGetMeQuery, useGetUsersQuery} = userApi;

