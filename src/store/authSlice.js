import { createSlice } from "@reduxjs/toolkit";

// we're using the slice to authenticate if the user is authenticated or not

//any method which tries to login any user, dispatches the login reducer to the store, to change the state change the state to logged in and authenticate the user

const initialState = {
    status : false,
    userData : null
}


const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload.userData;
            
            

        },
        logout : (state) => {
            state.status = false,
            state.userData = null
        }
    }
})

export const {login, logout} = authSlice.actions


export default authSlice.reducer