import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WorkoutStore {
  recommendations: any;
  setRecommendations: (data: any) => void;
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set) => ({
      recommendations: null,
      setRecommendations: (data) => set({ recommendations: data }),
    }),
    {
      name: 'workout-storage', 
    }
  )
);
