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
    addPost: (state, action) => {
      state.userProfile.posts = [action.payload, ...state.userProfile.posts];
    },
  },
});

export const { userPresent, userAbsent, addPost } = UserProfileSlice.actions;
export default UserProfileSlice.reducer;
