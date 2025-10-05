import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAds = createAsyncThunk('ads/fetchAll', async () => {
  const res = await axios.get('/api/ads');
  return res.data;
});

export const fetchAdId = createAsyncThunk('ads/fetchById', async (id) => {
  const res = await axios.get(`/api/ads/${id}`);
  return res.data;
});

export const addAd = createAsyncThunk('ads/addAd', async (adData) => {
  const res = await axios.post('api/ads', adData);
  return res.data;
});

export const deleteAd = createAsyncThunk('ads/deleteAd', async (id) => {
  const res = await axios.delete(`api/ads/${id}`);
  return res.data;
});

export const updateAd = createAsyncThunk(
  'ads/updateAd',
  async ({ id, adData }) => {
    const res = await axios.put(`api/ads/${id}`, adData);
    return res.data;
  }
);
