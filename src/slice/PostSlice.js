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

      const postIndex = state.posts.findIndex((post) => post.id === postId);

      if (postIndex !== -1) {
        const updatedPost = { ...state.posts[postIndex] };
        updatedPost.comments = [...updatedPost.comments, comment];

        state.posts[postIndex] = updatedPost;
      }
    },
  },
});

export const { createPost, setPost, deletePost, addComment } =
  PostSlice.actions;
export default PostSlice.reducer;
