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
  const [showChartModal, setShowChartModal] = useState(false);

  return (
    <div className="items-center justify-center">
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
      <div className="flex justify-end mr-10 pt-40">
        <button
          onClick={() => setShowChartModal(true)}
          className="mt-4 px-5 py-3 bg-cyan-500 text-black rounded"
        >
          내 몸의 변화보기
        </button>
      </div>
      {showChartModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[90%] max-w-5xl p-6 rounded-lg relative">
            <button
              onClick={() => setShowChartModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
            >
              ✖
            </button>
            <LineChart />
          </div>
        </div>
      )}
    </div>
  );
}
