"use client";
import React from "react";
import { useWorkoutStore } from "../store/useStore";
import Item from "./components/item";

const Exercise = () => {
  const selectedExercises = useWorkoutStore((state) => state.selectedExercises);

  return (
    <div className="w-full">
      {selectedExercises.map((exercise,i) => (
        <Item
        key={i}
        name={exercise.name}
        imageurl={exercise.imageUrl}
        />
      ))}
    </div>
  );
};

export default Exercise;
