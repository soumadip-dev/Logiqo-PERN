import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';
import toast from 'react-hot-toast';

export const useAuthStore = create(set => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data.user });
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async data => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post('/auth/register', data);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
    } catch (error) {
      toast.error('User already exists');
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async data => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
    } catch (error) {
      toast.error('Invalid credentials');
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });

      toast.success('Logout successful');
    } catch (error) {
      toast.error('Error logging out');
    }
  },
}));
