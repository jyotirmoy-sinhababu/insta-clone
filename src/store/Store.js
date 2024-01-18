import { configureStore } from '@reduxjs/toolkit';

import authstateaReducer from '../slice/AuthstateSlice';
import userProfileReducer from '../slice/UserProfileSlice';
import PostReducer from '../slice/PostSlice';

const Store = configureStore({
  reducer: {
    auth: authstateaReducer,
    profile: userProfileReducer,
    post: PostReducer,
  },
});

export default Store;
