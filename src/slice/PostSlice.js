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
    deletePost: (state, action) => {
      const filteredPost = state.posts.filter((item) => {
        return item.id !== action.payload;
      });
      state.posts = filteredPost;
    },
    setPost: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { createPost, setPost, deletePost } = PostSlice.actions;
export default PostSlice.reducer;
