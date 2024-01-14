import { createSlice } from '@reduxjs/toolkit';

const AuthstateSlice = createSlice({
  name: 'user',
  initialState: {
    user: JSON.parse(localStorage.getItem('user-info')) || null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = AuthstateSlice.actions;
export default AuthstateSlice.reducer;
