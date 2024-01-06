import { createSlice } from '@reduxjs/toolkit';

const UserProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    userProfile: null,
  },
  reducers: {
    userPresent: (state, action) => {
      state.userProfile = action.payload;
    },
    userAbsent: (state) => {
      state.userProfile = null;
    },
  },
});

export const { userPresent, userAbsent } = UserProfileSlice.actions;
export default UserProfileSlice.reducer;
