"use client";
import { useState } from "react";
import SelectBox from "./components/SelectBox";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useWorkoutStore } from "../store/useStore";

const MainPage: React.FC = () => {
  const [exerciseArea, setExerciseArea] = useState<string[]>([]);
  const router = useRouter();
  const { setRecommendations } = useWorkoutStore();

  console.log(exerciseArea);

  const handleSearch = async () => {
    const token = sessionStorage.getItem("Authorization");
    if (token !== null) {
      try {
        const res = await axios.post(
          "http://ec2-3-35-143-24.ap-northeast-2.compute.amazonaws.com:8080/workout/recommendations",
          {
            workoutCategoryList: exerciseArea,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        if(res.status === 200){
          console.log('성공')
           setRecommendations(res.data);
          router.push("/mainpage/searched");
        }
      } catch (error) {
        alert("최소 3개의 부위를 선택해 주세요.");
      }
    } else {
      alert("로그인 필요!");
      router.push("/login");
    }
  };

  return (
    <div className="pt-[50px] flex flex-col justify-between h-[60%]">
      <p className="text-white text-[20px] font-[600]">
        {" "}
        운동할 부위를 골라주세요!
      </p>
      <SelectBox selected={exerciseArea} onChange={setExerciseArea} />
      <button
        className="absolute bottom-[80px] left-0 right-0 mx-auto bg-[#E45258] h-[40px] text-white font-bold w-[250px] rounded"
        onClick={handleSearch}
      >
        조회하기
      </button>
    </div>
  );
};

export default MainPage;
