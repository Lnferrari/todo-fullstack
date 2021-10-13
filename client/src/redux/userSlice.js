import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      for (let key in action.payload) {
        state[key] = action.payload[key]
      }
    },
    userLogout: (state, action) => {
      return {}
    }
  }
})

export const { setUser, userLogout } = userSlice.actions

export default userSlice.reducer