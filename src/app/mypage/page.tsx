"use client";

import BodyInput from "./components/BodyInput";
import Profile from "../../../public/anonymous_profile_image2.svg";
import { useState } from "react";
import ProfileImage from "./components/ProfileImage";
import ProfileHistory from "./components/ProfileHistory";
import LineChart from './components/BodyStatLineChart';


export default function Home() {
  const [bodyData, setBodyData] = useState({
    키:"",
    몸무게: "",
    골격근량: "",
    체지방률: ""
  });
  const inputChange = (id: string, value: string) => {
    setBodyData((prev) => ({ ...prev, [id]: value }));
  }
  const saveLogic = () => { // api 요청 같은 저장 로직 더 구현해야함
    alert("수정 완료되었습니다!");
    console.log("저장된 데이터:", bodyData); // 확인용
  }

  const [profileImg, setProfileImg] = useState<string>(Profile as unknown as string);  // 초기 이미지
  const [showHistory, setShowHistory] = useState(false);
  const imageChange = (newImage: string) => {
    setProfileImg(newImage);
  };

  return (
    <div className="w-full h-screen bg-[#4B4B4B] items-center justify-center">
      {/* 신체정보 입력과 프로필 사진 */}
      <div className="h-[35%] flex justify-between text-center">
        <div className="w-[40%] ml-10 border-2 border-solid border-black">
          <p className="h-[20%] pt-2 text-[#B3B3B3] text-2xl border-b-2 border-black">
            나의 신체 정보
          </p>
          <BodyInput
            name="키"
            id="height"
            placeholder="cm"
            unit="cm"
            onChange={inputChange}
          />
          <BodyInput
            name="몸무게"
            id="weight"
            placeholder="kg"
            unit="kg"
            onChange={inputChange}
          />
          <BodyInput
            name="골격근량"
            id="SMM"
            placeholder="kg"
            unit="kg"
            onChange={inputChange}
          />
          <BodyInput
            name="체지방률"
            id="Body Fat"
            placeholder="%"
            unit="%"
            onChange={inputChange}
          />
          <button
            onClick={saveLogic}
            className="border-2 border-black w-[50%] mt-5"
          >
            수정하기
          </button>
        </div>
        <div className="w-[40%] aspect-[4/3] mr-10 relative">
          <ProfileImage
            viewImage={profileImg}
            onClick={() => setShowHistory(true)}
          />

          {showHistory && (
            <ProfileHistory
              onClose={() => setShowHistory(false)}
              onImageChange={imageChange}
            />
          )}
        </div>

      </div>
      <div className="w-full mt-20 px-10">
        <LineChart />
       </div>
    </div>
  );
}
