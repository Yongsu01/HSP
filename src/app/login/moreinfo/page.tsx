"use client";
import { useState } from "react";
import SexDiv from "./components/SexDiv";
import HeightInput from "./components/HeightInput";
import UserRole from "./components/UserRole";
import axios from "axios";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const [sex, setSex] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [userRole, setRole] = useState<string>("");
  const router = useRouter();

  console.log(sex);
  console.log(height);
  console.log(userRole);

  const signupHandler = async () => {
    const token = sessionStorage.getItem("Authorization");
    try {
      const response = await axios.post("https://hanseifitu.shop/user/profile?userId=12",
        {height: height,
          gender: sex,
          role: userRole,
        },{
          headers : {Authorization : `Bearer ${token}`}
        }
      );
      if(response.status === 200){
        router.push("/mainpage");
      }
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
      <button className="mt-9 bg-[#E45258] h-[40px] text-white font-bold w-[250px] rounded"
      onClick={signupHandler}>
    회원가입하기
  </button>
    </div>
  );
};

export default Home;
