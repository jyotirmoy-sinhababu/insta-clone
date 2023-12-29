import { configureStore } from '@reduxjs/toolkit';

import authstateaReducer from '../slice/AuthstateSlice';

const Store = configureStore({
  reducer: {
    auth: authstateaReducer,
  },
});

export default Store;
