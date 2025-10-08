import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/auth';

export const login = createAsyncThunk('auth/login', async (loginData) => {
  const res = await axios.post(`${API_URL}/login`, loginData, {
    withCredentials: true,
  });
  return res.data;
});

export const register = createAsyncThunk('auth/register', async (regiData) => {
  const res = await axios.post(`${API_URL}/register`, regiData, {
    withCredentials: true,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
});
export const fetchUser = createAsyncThunk('auth/user', async () => {
  const res = await axios.get(`${API_URL}/user`, { withCredentials: true });
  return res.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const res = await axios.delete(`${API_URL}/logout`, {
    withCredentials: true,
  });
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
