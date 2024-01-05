import { createSlice } from '@reduxjs/toolkit';

const UserProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    userProfile: null,
  },
  reducers: {
    headerData: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { headerData } = UserProfileSlice.actions;
export default UserProfileSlice.reducer;
