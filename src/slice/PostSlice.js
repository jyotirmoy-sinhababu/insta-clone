import { createSlice } from '@reduxjs/toolkit';

const PostSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
  },
  reducers: {
    createPost: (state, action) => {
      state.posts = action.payload;
    },
    setPost: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { createPost, setPost } = PostSlice.actions;
export default PostSlice.reducer;
