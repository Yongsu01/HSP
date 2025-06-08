'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ExerciseSlider from '../../components/ExerciseSlider';
import { Exercise } from '../../types/exercise';
import { useWorkoutStore } from '@/app/store/useStore';

export default function Home() {
  const recommendations = useWorkoutStore((state) => state.recommendations);

  const groupedExercises: Exercise[][] = useMemo(() => {
    if (!recommendations) return [];

    return recommendations.map((item: any, index: number) => {
      const mainExercise: Exercise = {
        id: `main-${index}`,
        name: item.mainWorkout,
        imageUrl: '',
      };

      const similarExercises: Exercise[] = item.similarWorkouts.map(
        (workout: string, subIndex: number) => ({
          id: `similar-${index}-${subIndex}`,
          name: workout,
          imageUrl: '',
        })
      );

      return [mainExercise, ...similarExercises];
    });
  }, [recommendations]);

  const [selectedExercises, setSelectedExercises] = useState<(Exercise | null)[]>([]);


  useEffect(() => {
    if (groupedExercises.length > 0) {
    setSelectedExercises(groupedExercises.map((group) => group[0]));
    }
  }, [groupedExercises]);

  const handleSelectExercise = useCallback(
    (sliderIndex: number, exercise: Exercise) => {
      setSelectedExercises((prev) => {
        const newSelected = [...prev];
        newSelected[sliderIndex] = exercise;
        return newSelected;
      });
    },
    []
  );

  return (
    <>
      {groupedExercises.map((group: Exercise[], index: number) => (
        <ExerciseSlider
          key={index}
          exercises={group}
          onSelect={(exercise) => handleSelectExercise(index, exercise)}
        />
      ))}

      <button
        className="bg-[#E45258] h-[40px] w-[250px] text-white font-bold rounded flex items-center justify-center pt-[20px] pb-[20px] mt-[50px]"
        onClick={() => {
              const selectedNames = selectedExercises
      .filter((ex): ex is Exercise => ex !== null) // null 제거
      .map((ex) => ex.name);
          console.log('확정된 운동들:', selectedNames);
        }}
      >
        확정하기
      </button>
    </>
  );
}
