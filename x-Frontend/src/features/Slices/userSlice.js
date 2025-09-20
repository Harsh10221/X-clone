import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo : null,
    isAuthenticated : false
}

export const userSlice = createSlice({
    name:'userData',
    initialState,
    reducers:{
        loginSuccess: (state,action) => {
            state.isAuthenticated = true
            state.userInfo = action.payload
            console.log("This is the data from login slice", state.userInfo)

        },
        logout: (state,action) =>{
            state.isAuthenticated = false
            state.userInfo = null
        }
    }
})

export const { loginSuccess,logout} = userSlice.actions

export default userSlice.reducer