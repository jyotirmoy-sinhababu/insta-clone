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
    addComment: (state, action) => {
      const { postId, comment } = action.payload;
      state.posts = state.posts.map((post) => {
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post;
      });
    },
  },
});

export const { createPost, setPost, deletePost, addComment } =
  PostSlice.actions;
export default PostSlice.reducer;
