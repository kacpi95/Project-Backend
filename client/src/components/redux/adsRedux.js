import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchAds = createAsyncThunk('ads/fetchAll', async () => {
  const res = await axios.get(`${API_URL}/ads`, { withCredentials: true });
  return res.data;
});

export const fetchAdId = createAsyncThunk('ads/fetchById', async (id) => {
  const res = await axios.get(`${API_URL}/ads/${id}`, { withCredentials: true });
  return res.data;
});

export const addAd = createAsyncThunk('ads/addAd', async (adData) => {
  const res = await axios.post(`${API_URL}/ads`, adData, { withCredentials: true });
  return res.data;
});

export const deleteAd = createAsyncThunk('ads/deleteAd', async (id) => {
  const res = await axios.delete(`${API_URL}/ads/${id}`, { withCredentials: true });
  return res.data;
});

export const updateAd = createAsyncThunk(
  'ads/updateAd',
  async ({ id, adData }) => {
    const res = await axios.put(`${API_URL}/ads/${id}`, adData, {
      withCredentials: true,
    });
    return res.data;
  }
);

const adsSlice = createSlice({
  name: 'ads',
  initialState: {
    list: [],
    currentAd: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAds.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAds.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload;
    });
    builder.addCase(fetchAds.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(fetchAdId.fulfilled, (state, action) => {
      state.currentAd = action.payload;
    });
    builder.addCase(addAd.fulfilled, (state, action) => {
      state.list.push(action.payload);
    });
    builder.addCase(deleteAd.fulfilled, (state, action) => {
      state.list = state.list.filter((ad) => ad._id !== action.payload);
    });
    builder.addCase(updateAd.fulfilled, (state, action) => {
      const index = state.list.findIndex((ad) => ad._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    });
  },
});

export default adsSlice.reducer;
