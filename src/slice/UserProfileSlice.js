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
    deleteProfilePost: (state, action) => {
      const filteredPost = state.userProfile.posts.filter((item) => {
        return item.id !== action.payload;
      });
      state.userProfile.posts = filteredPost;
      console.log(state.userProfile.posts);
    },
  },
});

export const { userPresent, userAbsent, addPost, deleteProfilePost } =
  UserProfileSlice.actions;
export default UserProfileSlice.reducer;
