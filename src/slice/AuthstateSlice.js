import { createSlice } from '@reduxjs/toolkit';

const AuthstateSlice = createSlice({
  name: 'user',
  initialState: {
    user: localStorage.getItem('user-info') || null,
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

export default AuthstateSlice;
