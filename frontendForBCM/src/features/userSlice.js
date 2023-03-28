import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstName : '',
  lastName : '',

}

export const userSlice = createSlice({
  name: 'user_info',
  initialState,
  reducers: {
   setUserInfo: (state, action) =>{
    state.firstName = action.payload.firstName
    state.lastName = action.payload.lastName
   },
   unSetUserInfo: (state, action) =>{
    state.firstName = action.payload.firstName
    state.lastName = action.payload.lastName
   }
  },
})
export const { setUserInfo,unSetUserInfo } = userSlice.actions

export default userSlice.reducer