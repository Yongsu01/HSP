"use client";

import BodyInput from "./components/BodyInput";
import Profile from "../../../public/anonymous_profile_image2.svg";
import { useState } from "react";
import ProfileImage from "./components/ProfileImage";
import ProfileHistory from "./components/ProfileHistory";
import LineChart from './components/BodyStatLineChart';


export default function Home() {
  const [bodyData, setBodyData] = useState({
    height: "",
    weight: "",
    muscle: "",
    bodyFat: "",
  });
  const inputChange = (id: string, value: string) => {
    const numeric = value.replace(/[^0-9.]/g, '');
    setBodyData((prev) => ({ ...prev, [id]: numeric }));
  };

    const saveLogic = async () => {
      const height = Number(bodyData.height) || 0;
      const weight = Number(bodyData.weight) || 0;
      const muscle = Number(bodyData.muscle) || 0;
      const bodyFat = Number(bodyData.bodyFat) || 0;

      const token = sessionStorage.getItem("Authorization");

      try {
        const response = await fetch(
          "http://ec2-3-35-143-24.ap-northeast-2.compute.amazonaws.com:8080/physical-infos",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              height: Number(bodyData.height),
              weight: Number(bodyData.weight),
              muscle: Number(bodyData.muscle),
              bodyFat: Number(bodyData.bodyFat),
            }),
          }
        );

        if (!response.ok) {
          throw new Error("저장 실패");
        }
        alert("수정 완료되었습니다!");
        console.log("저장된 데이터:", { height, weight, muscle, bodyFat });
      } catch (error) {
        console.error("저장 에러:", error);
        alert("저장에 실패했습니다.");
      }
    };

  const [profileImg, setProfileImg] = useState<string>(
    Profile as unknown as string
  ); // 초기 이미지
  const [showHistory, setShowHistory] = useState(false);
  const imageChange = (newImage: string) => {
    setProfileImg(newImage);
  };
  const [showChartModal, setShowChartModal] = useState(false);

  return (
    <div className="flex flex-col min-h-screen justify-start px-4">
      <div className="flex justify-between items-start w-full max-w-[402px] mx-auto mt-20">
        <div className="flex flex-col space-y-2 w-[60%]">
          <p className="text-black text-lg border-b-2 border-black pb-2 mb-2">
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
            id="muscle"
            placeholder="kg"
            unit="kg"
            onChange={inputChange}
          />
          <BodyInput
            name="체지방률"
            id="bodyFat"
            placeholder="%"
            unit="%"
            onChange={inputChange}
          />
          <button
            onClick={saveLogic}
            className="border-2 border-black w-full mt-4 py-2 text-sm md:text-base"
          >
            수정하기
          </button>
        </div>
        {/* 프로필 이미지 */}
        <div className="w-[200px] h-[200px] ml-4 mt-10">
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
      <div className="flex justify-end w-full px-4 mt-6">
        <button
          onClick={() => setShowChartModal(true)}
          className="fixed bottom-20 right-4 px-5 py-3 bg-cyan-500 text-black rounded z-50"
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
