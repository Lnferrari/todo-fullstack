import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      for (let key in action.payload) {
        state[key] = action.payload[key]
      }
    }
  }
})

export const { setUser } = userSlice.actions

export default userSlice.reducer