import { create } from 'zustand';
import axiosInstance from '../lib/axiosInstance';
import toast from 'react-hot-toast';

export const useProblemStore = create(set => ({
  isCreatingProblem: false,
  isLoadingAllProblems: false,
  isLoadingSpecificProblem: false,
  isLoadingSolvedProblems: false,
  allProblems: [],
  specificProblem: null,
  solvedProblems: [],

  // Create problem
  createProblem: async problemData => {
    set({ isCreatingProblem: true });
    try {
      const response = await axiosInstance.post('/problems/create-problem', problemData);
      toast.success(response.data.message || 'Problem created successfully');
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to create problem');
    } finally {
      set({ isCreatingProblem: false });
    }
  },

  // Get all problems
  fetchAllProblems: async () => {
    set({ isLoadingAllProblems: true });
    try {
      const response = await axiosInstance.get('/problems/get-all-prblems');
      set({ allProblems: response.data.problems });
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to fetch problems');
    } finally {
      set({ isLoadingAllProblems: false });
    }
  },

  // Get specific problem by ID
  fetchProblemById: async problemId => {
    set({ isLoadingSpecificProblem: true });
    try {
      const response = await axiosInstance.get(`/problems/get-problem/${problemId}`);
      console.log(response.data.problem);
      
      set({ specificProblem: response.data.problem });
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to fetch problem');
    } finally {
      set({ isLoadingSpecificProblem: false });
    }
  },

  // Get solved problems by user
  fetchSolvedProblems: async () => {
    set({ isLoadingSolvedProblems: true });
    try {
      const response = await axiosInstance.get(`/problems/get-solved-problems`);
      set({ solvedProblems: response.data.problems });
      toast.success(response.data.message || 'Solved problems fetched successfully');
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to fetch solved problems');
    } finally {
      set({ isLoadingSolvedProblems: false });
    }
  },
}));
