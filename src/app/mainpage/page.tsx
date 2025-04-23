"use client";
import { useState } from "react";
import SelectBox from "./components/SelectBox";
const MainPage: React.FC = () => {
  const [exerciseArea, setExerciseArea] = useState<string[]>([]); 
  console.log(exerciseArea)

  return (
    <div className="pt-[50px] flex flex-col justify-between h-[60%]">
      <p className="text-white text-[20px] "> 운동할 부위를 골라주세요!</p>
      <SelectBox selected={exerciseArea} onChange={setExerciseArea} />
      <button className="absolute bottom-[80px] left-0 right-0 mx-auto bg-[#E45258] h-[40px] text-white font-bold w-[250px] rounded">
    조회하기
  </button>
    </div>
  );
};

export default MainPage;
