import { createSlice } from '@reduxjs/toolkit'

const initialState = {id:"",
 top_note: "", about_us: "", footer_email: "", session_conduct:"", our_teachers:"", our_students:""
}

export const webSlice = createSlice({
  name: 'auth_info',
  initialState,
  reducers: {
    //jub bhi loggedIn honge to Token ko set kar denge
      setWebInfo: (state, action) => {
        state.id = action.payload.id
        state.top_note = action.payload.top_note
        state.about_us = action.payload.about_us
        state.footer_email = action.payload.footer_email
        state.session_conduct = action.payload.session_conduct
        state.our_teachers = action.payload.our_teachers
        state.our_students = action.payload.our_students
      },
      unsetWebInfo: (state, action) => {
        state.id = action.payload.id
        state.top_note = action.payload.top_note
        state.about_us = action.payload.about_us
        state.footer_email = action.payload.footer_email
        state.session_conduct = action.payload.session_conduct
        state.our_teachers = action.payload.our_teachers
        state.our_students = action.payload.our_students
    },
  },
})

// Action creators are generated for each case reducer function
export const { setWebInfo, unsetWebInfo  } = webSlice.actions

export default webSlice.reducer