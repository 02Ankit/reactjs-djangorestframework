//iska use app.js me slice lagane ke liye REdux State Slice ka use karna hai
// Redux State Slice ka use karke slice ka use karenge
//in sub ka use hum is liye kar rahe hai kyunki jub bhi url pe hum logeedIn rahenge to koi bhi Url me dashboard ke jagha login bhi likhe ya dashboard ko hata de to bhi hume usi page pe ya loggedIn rahe na ki dusre page pe chale jaye ya logout ho jaye
// iske liye hume redux documentattion me jake waha se code nikalte hai.  https://redux-toolkit.js.org/rtk-query/overview
//*********************************************************************************************************************************************/
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 access_token: null,
}

export const authSlice = createSlice({
  name: 'auth_token',
  initialState,
  reducers: {
    //jub bhi loggedIn honge to Token ko set kar denge
    setUserToken:(state, action)=>{
        state.access_token = action.payload.access_token
    },
    unSetUserToken:(state, action)=>{
        state.access_token = action.payload.access_token
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserToken, unSetUserToken } = authSlice.actions

export default authSlice.reducer