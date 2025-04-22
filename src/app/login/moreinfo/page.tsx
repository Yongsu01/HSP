"use client";
import { useState } from "react";
import SexDiv from "./components/SexDiv";
import HeightInput from "./components/HeightInput";
import UserRole from "./components/UserRole";
import axios from "axios";

const Home: React.FC = () => {
  const [sex, setSex] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [userRole, setRole] = useState<string>("");

  console.log(sex);
  console.log(height);
  console.log(userRole);

  const signupHandler = async () => {
    try {
      const response = await axios.post("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100%] w-[250px] min-w-[150px] max-w-[100%] text-center flex flex-col">
      <div className="text-[#FFFFFF] text-[28px] pt-[30px] font-semibold ">
        추가정보 입력
      </div>
      <div className="flex flex-col pt-[30px] gap-[15px]">
        <HeightInput height={height} setHeight={setHeight} />
        <SexDiv sex={sex} setSex={setSex} />
        <UserRole userRole={userRole} setRole={setRole} />
      </div>
      <button className="absolute bottom-[150px] left-0 right-0 mx-auto bg-[#E45258] h-[40px] text-white font-bold w-[250px] rounded">
    회원가입하기
  </button>
    </div>
  );
};

export default Home;
