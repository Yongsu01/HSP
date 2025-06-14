"use client";
import React from "react";
import { useWorkoutStore } from "../store/useStore";
import Item from "./components/item";
import axios from "axios";
import { useRouter } from "next/navigation";

const Exercise = () => {
  const router = useRouter();
  const { selectedExercises, workoutResults,resetWorkoutResults } = useWorkoutStore();
  const allChecked = selectedExercises.every((ex) =>
    workoutResults.some((res) => res.name === ex.name)
  );

  console.log(workoutResults);

  const handleSave = async () => {
    const token = sessionStorage.getItem("Authorization");
    const transformedWorkoutResults = workoutResults.map(
      ({ name, weight, sets, reps }) => ({
        workoutName: name,
        weight,
        numOfSets: sets,
        repsPerSet: reps,
      })
    );
    try {
      const res = await axios.post(
        "https://hanseifitu.shop/api/workout-detail-logs",
        {
          workoutList: transformedWorkoutResults,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(res.status === 200){
        resetWorkoutResults();
        console.log(workoutResults)
        alert('저장완료!');
        router.push("/mainpage")
      }
    } catch (error) {
      alert("에러!");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {selectedExercises.map((exercise, i) => (
        <Item key={i} name={exercise.name} imageurl={exercise.imageUrl} />
      ))}
      <button
        disabled={!allChecked}
        className={`mt-7 justify-center h-[40px] w-[250px] rounded font-bold text-white ${
          allChecked ? "bg-[#E45258]" : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleSave}
      >
        저장하기
      </button>
    </div>
  );
};

export default Exercise;
