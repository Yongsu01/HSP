'use client';
import React, { useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Exercise } from "../types/exercise";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  exercises: Exercise[];
  onSelect?: (selectedExercise: Exercise) => void;
}

export default function ExerciseSlider({ exercises, onSelect }: Props) {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      origin: "center",
      perView: 1.1,
      spacing: 16,
    },
    slideChanged(s) {
      const idx = s.track.details.rel;
      onSelect && onSelect(exercises[idx]);
    },
  });

  useEffect(() => {
    if (exercises.length > 0) {
      onSelect && onSelect(exercises[0]);
    }
  }, []);

  console.log("자식 렌더링");

  const prevSlide = () => slider.current?.prev();
  const nextSlide = () => slider.current?.next();

  return (
    <div className="relative w-full h-screen flex items-center justify-center pt-[50px]">
      <button
        onClick={prevSlide}
        className="absolute left-5 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <div ref={sliderRef} className="keen-slider w-full">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="keen-slider__slide flex flex-col items-center justify-center"
          >
            <div className="w-[65%] aspect-square rounded-lg bg-gray-400 overflow-hidden">
              <img src={exercise.imageUrl} className="w-full h-full"/>
            </div>
            <p className="mt-2 absolute bottom-0 font-semibold bg-white">{exercise.name}</p>
          </div>
        ))}
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-5 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
