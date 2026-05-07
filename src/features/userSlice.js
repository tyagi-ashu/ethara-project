import {createSlice} from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState:{
        user: null,
        isAuthenticated:false,
        isLoading: false,
        error: null,
    },
    reducers:{
        setUser:(state,action) =>{
            state.user = action.payload;
            state.isAuthenticated = true;
            state.error =null;
        },
        //i dont think setLoading and setError is used anywhere for now
        setLoading:(state,action) =>{
            state.isLoading = action.payload;
        },
        setError:(state,action) =>{
            state.error = action.payload;
            state.isAuthenticated = false;
        },
        logout:(state) =>{
            state.user = null;
            state.isAuthenticated = false;
            state.error = null;
        }
    }
});

export const {setUser, setLoading, setError, logout} = userSlice.actions;
export default userSlice.reducer;
