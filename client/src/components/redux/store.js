import { configureStore } from '@reduxjs/toolkit';
import adsRedux from './adsRedux';

const store = configureStore({
  reducer: {
    ads: adsRedux,
  },
});

export default store;
