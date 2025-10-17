import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';
import toast from 'react-hot-toast';

export const useProblemStore = create(set => ({
  isProblemCreating: false,

  createProblem: async problemData => {
    set({ isProblemCreating: true });
    try {
      const response = await axiosInstance.post('/problems/create-problem', problemData);
      toast.success(response.data.message || 'Problem created successfully');
    } catch (error) {
      console.log(error.message);
      toast.error('Failed to create problem');
    } finally {
      set({ isProblemCreating: false });
    }
  },
}));
