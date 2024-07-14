import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user_id: -100,
}

const authorizeSlice = createSlice({
  name: 'authorize',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user_id = action.payload
    },
    logout : (state) => {
      state.user_id = -100
    },
  }
})

export const { login, logout } = authorizeSlice.actions
export default authorizeSlice.reducer