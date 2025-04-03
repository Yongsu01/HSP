"use client";
import { useState } from "react";
import SexDiv from "./components/SexDiv";
import HeightInput from "./components/HeightInput";

const Home: React.FC = () => {
  const [sex, setSex] = useState<string>("");
  const [height, setHeight] = useState<string>("");

  console.log(sex)
  console.log(height)
 

  return (
    <div className="h-[100%] w-[250px] min-w-[150px] max-w-[100%] text-center flex flex-col">
      <div className="text-[#FFFFFF] text-[28px] pt-[30px] font-semibold ">
        추가정보 입력
      </div>
      <div className="flex flex-col pt-[30px] gap-[15px]">
        <HeightInput height={height} setHeight={setHeight} />
        <SexDiv sex={sex} setSex={setSex} />
      </div>
    </div>
  );
};

export default Home;