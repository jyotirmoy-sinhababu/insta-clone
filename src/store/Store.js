import { configureStore } from '@reduxjs/toolkit';

import authstateaReducer from '../slice/AuthstateSlice';
import userProfileReducer from '../slice/UserProfileSlice';

const Store = configureStore({
  reducer: {
    auth: authstateaReducer,
    profile: userProfileReducer,
  },
});

export default Store;
