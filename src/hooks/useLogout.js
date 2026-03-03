// src/hooks/useLogout.js
//
// Logout is a pure Redux action. No navigation.reset() — RootNavigator handles
// switching to Auth when isAuthenticated becomes false.

import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { storageService } from '../utils/storage';

const useLogout = () => {
  const dispatch = useDispatch();

  const performLogout = useCallback(async () => {
    await storageService.clearAuthOnly();
    dispatch(logout());
  }, [dispatch]);

  return performLogout;
};

export default useLogout;