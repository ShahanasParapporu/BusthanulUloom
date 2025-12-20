// src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { USER_ROLES } from '../../constants/theme';

const initialState = {
  isAuthenticated: false,
  user: null,
  role: USER_ROLES.GUEST,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.role = USER_ROLES.GUEST;
      state.token = null;
      state.error = null;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setRole,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;