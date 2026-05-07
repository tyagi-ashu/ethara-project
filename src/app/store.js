import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector} from 'react-redux';
import userReducer from '../features/userSlice';
import {api} from '../apis/api';

export const store = configureStore({
    reducer:{
        user: userReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false
    }).concat(api.middleware),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = (selector) => useSelector(selector);