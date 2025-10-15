import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';

const useAuthStore = create(set => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  // Actions to check authentication
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get('/auth/check');
      console.log('checkAuth response:', response);

      set({ authUser: response.data.user });
    } catch (error) {
      console.error('Error checking authentication:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Actions to handle sign up
  signUp: async data => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post('/auth/register', data);
      console.log('Sign up response:', response);
      set({ authUser: response.data.user });
    } catch (error) {
      console.error('Error signing up:', error);
    } finally {
      set({ isSigningUp: false });
    }
  },
}));

export default useAuthStore;
