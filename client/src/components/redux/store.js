import { configureStore } from '@reduxjs/toolkit';
import adsRedux from './adsRedux';
import authRedux from './authRedux';

const store = configureStore({
  reducer: {
    ads: adsRedux,
    auth: authRedux,
  },
});

export default store;
