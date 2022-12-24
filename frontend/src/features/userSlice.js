//iska use app.js me slice lagane ke liye REdux State Slice ka use karna hai
// Redux State Slice ka use karke slice ka use karenge
//in sub ka use hum is liye kar rahe hai kyunki jub bhi url pe hum logeedIn rahenge to koi bhi Url me dashboard ke jagha login bhi likhe ya dashboard ko hata de to bhi hume usi page pe ya loggedIn rahe na ki dusre page pe chale jaye ya logout ho jaye
// iske liye hume redux documentattion me jake waha se code nikalte hai.  https://redux-toolkit.js.org/rtk-query/overview
//*********************************************************************************************************************************************/
import { createSlice } from '@reduxjs/toolkit'

const initialState = {id:"",
 email: "", firstname: "", lastname: "", contact:"", gender:"", usertype:""
}

export const userSlice = createSlice({
  name: 'auth_info',
  initialState,
  reducers: {
    //jub bhi loggedIn honge to Token ko set kar denge
      setUserInfo: (state, action) => {
        state.id = action.payload.id
        state.email = action.payload.email
        state.firstname = action.payload.firstname
        state.lastname = action.payload.lastname
        state.contact = action.payload.contact
        state.gender = action.payload.gender
        state.usertype = action.payload.usertype
      },
      unsetUserInfo: (state, action) => {
        state.id = action.payload.id
        state.email = action.payload.email
        state.firstname = action.payload.firstname
        state.lastname = action.payload.lastname
        state.contact = action.payload.contact
        state.gender = action.payload.gender
        state.usertype = action.payload.usertype
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserInfo, unsetUserInfo  } = userSlice.actions

export default userSlice.reducer