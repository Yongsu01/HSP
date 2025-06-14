import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Exercise } from "@/app/types/exercise";

interface WorkoutResult {
  index: number;
  name: string;
  sets: number;
  weight: number;
  reps: number;
}

interface WorkoutState {
  recommendations: any[];
  setRecommendations: (recommendations: any[]) => void;

  selectedExercises: Exercise[];
  setSelectedExercises: (exercises: Exercise[]) => void;

  workoutResults: WorkoutResult[];
  addWorkoutResult: (result: WorkoutResult) => void;
  hasResultFor: (index: number) => boolean;
  resetWorkoutResults: () => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      recommendations: [],
      setRecommendations: (recommendations) => set({ recommendations }),

      selectedExercises: [],
      setSelectedExercises: (exercises) =>
        set({ selectedExercises: exercises }),

      workoutResults: [],
      addWorkoutResult: (result) => {
        const filtered = get().workoutResults.filter(
          (r) => r.index !== result.index
        );
        const newResults = [...filtered, result];
        if (newResults.length > 5) {
          newResults.shift();
        }
        set({ workoutResults: newResults });
      },

      hasResultFor: (index) => {
        return get().workoutResults.some((r) => r.index === index);
      },
      resetWorkoutResults: () => set({ workoutResults: [] }),
    }),
    {
      name: "workout-storage",
      partialize: (state) => ({
        recommendations: state.recommendations,
        selectedExercises: state.selectedExercises,
        workoutResults: state.workoutResults,
      }),
    }
  )
);
