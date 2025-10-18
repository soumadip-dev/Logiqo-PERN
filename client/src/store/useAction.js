import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';
import toast from 'react-hot-toast';

export const useActionStore = create(set => ({
  isDeletingProblem: false,
  isUpdatingProblem: false,

  deleteProblem: async id => {
    try {
      set({ isDeletingProblem: true });
      const res = await axiosInstance.delete(`/problems/delete-problem/${id}`);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      console.log('Error deleting problem', error);
      toast.error('Error deleting problem');
      throw error;
    } finally {
      set({ isDeletingProblem: false });
    }
  },

  updateProblem: async (id, updateData) => {
    try {
      set({ isUpdatingProblem: true });
      const res = await axiosInstance.put(`/problems/update-problem/${id}`, updateData);
      toast.success(res.data.message);
      return res.data;
    } catch (error) {
      console.log('Error updating problem', error);
      toast.error('Error updating problem');
      throw error;
    } finally {
      set({ isUpdatingProblem: false });
    }
  },
}));
