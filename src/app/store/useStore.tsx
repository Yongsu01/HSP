import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Exercise } from '@/app/types/exercise';

interface WorkoutState {
  recommendations: any[];
  setRecommendations: (recommendations: any[]) => void;

  selectedExercises: Exercise[];
  setSelectedExercises: (exercises: Exercise[]) => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set) => ({
      recommendations: [],
      setRecommendations: (recommendations) => set({ recommendations }),

      selectedExercises: [],
      setSelectedExercises: (exercises) => set({ selectedExercises: exercises }),
    }),
    {
      name: 'workout-storage',
      partialize: (state) => ({
        recommendations: state.recommendations,
        selectedExercises: state.selectedExercises,
      }),
    }
  )
);