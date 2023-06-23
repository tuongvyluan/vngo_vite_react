import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account:[],
  isLoggedIn:false
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    
    loginSuccess: (state, action) => {
      state.account = action.payload,
      state.isLoggedIn = true
    },
    logout:(state,action)=>{
      state.account=[],
      state.isLoggedIn = false
    }
  },
})

// Action creators are generated for each case reducer function
export const {loginSuccess,logout } = loginSlice.actions

export default loginSlice.reducer