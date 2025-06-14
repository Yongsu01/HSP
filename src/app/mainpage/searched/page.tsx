"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import ExerciseSlider from "../../components/ExerciseSlider";
import { Exercise } from "../../types/exercise";
import { useWorkoutStore } from "@/app/store/useStore";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const recommendations = useWorkoutStore((state) => state.recommendations);
  const router = useRouter();

  const setSelectedExercisesInStore = useWorkoutStore(
    (state) => state.setSelectedExercises
  );

  const groupedExercises: Exercise[][] = useMemo(() => {
    if (!recommendations) return [];

    return recommendations.map((item: any, index: number) => {
      const mainExercise: Exercise = {
        id: `main-${index}`,
        name: item.mainWorkout.name,
        imageUrl: item.mainWorkout.imageUrl || "",
      };

      const similarExercises: Exercise[] = item.similarWorkouts.map(
        (workout: any, subIndex: number) => ({
          id: `similar-${index}-${subIndex}`,
          name: workout.name,
          imageUrl: workout.imageUrl || "",
        })
      );

      return [mainExercise, ...similarExercises];
    });
  }, [recommendations]);

  const [selectedExercises, setSelectedExercises] = useState<
    (any | null)[]
  >([]);

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

const handleSubject = async () => {
  const token = sessionStorage.getItem("Authorization");
  const payload = selectedExercises
    .filter((ex): ex is Exercise => ex !== null)
    .map((ex) => ex.name);

  try {
    const res = await axios.post(
      "https://hanseifitu.shop/workout/gifs",
      { workouts: payload },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.status === 200) {
      const gifsData: { workoutName: string; gif: string | null }[] = res.data;

      const updatedExercises = selectedExercises.map((ex) => {
        const gifInfo = gifsData.find((g) => g.workoutName === ex?.name);
        return {
          ...ex,
          imageUrl: gifInfo?.gif || ex?.imageUrl || "",
        };
      });

      setSelectedExercises(updatedExercises);
       setSelectedExercisesInStore(updatedExercises);
        router.push("/exercise");
    }
  } catch (error) {
    console.log(error);
  }
};

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
          handleSubject();
        }}
      >
        확정하기
      </button>
    </>
  );
}
