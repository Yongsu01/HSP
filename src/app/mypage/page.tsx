"use client";

import BodyInput from "./components/BodyInput";
import Profile from "../../../public/anonymous_profile_image2.svg";
import { useState, useEffect } from "react";
import ProfileImage from "./components/ProfileImage";
import ProfileHistory from "./components/ProfileHistory";
import LineChart from "./components/BodyStatLineChart";

export default function Home() {
  const [bodyData, setBodyData] = useState({
    height: "",
    weight: "",
    muscle: "",
    bodyFat: "",
  });

  useEffect(() => {
    const recentBodyData = async () => {
      const token = sessionStorage.getItem("Authorization");
      if (token !== null) {
        try {
          const res = await fetch(
            "https://hanseifitu.shop/physical-infos",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!res.ok) throw new Error("최신 신체 정보 get 실패");
          const data = await res.json();

          setBodyData({
            height: data.height != null ? data.height.toString() : "",
            weight: data.weight != null ? data.weight.toString() : "",
            muscle: data.muscle != null ? data.muscle.toString() : "",
            bodyFat: data.bodyFat != null ? data.bodyFat.toString() : "",
          });
        } catch (error) {
          console.error("최신 신체 정보 get 에러:", error);
        }
      }
    };
    recentBodyData();
  },[]);


  const inputChange = (id: string, value: string) => {
    const numeric = value.replace(/[^0-9]/g, "");
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
        "https://hanseifitu.shop/physical-infos",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            height,
            weight,
            muscle,
            bodyFat,
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

  // 초기 이미지가 객체라서 .src를 꼭 써줘야 함
  const [profileImg, setProfileImg] = useState<string>(Profile.src);
  const [showHistory, setShowHistory] = useState(false);
  const imageChange = (newImage: string) => {
    setProfileImg(newImage);
  };

  const [showChartModal, setShowChartModal] = useState(false);
  useEffect(() => {
    const latestProfile = async () => {
      const token = sessionStorage.getItem("Authorization");
      if (!token) return;

      try {
        const res = await fetch("https://hanseifitu.shop/body-image", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("이미지를 불러오는 데 실패했습니다.");
        const data = await res.json();

        setProfileImg(
          typeof data.imageUrl === "string" && data.imageUrl.trim()
            ? data.imageUrl : Profile.src
        );
        // 이미지가 없으면 기본 이미지를 유지

      } catch (err) {
        console.error("프로필 이미지 불러오기 에러:", err);
        setProfileImg(Profile.src);
      }
    };

    latestProfile();
  }, []);

  return (
    <div className="flex flex-col min-h-screen justify-start px-4">
      <div className="flex justify-between items-start w-full max-w-[402px] mx-auto mt-20">
        <div className="flex flex-col space-y-2 w-[60%]">
          <p className="text-black text-xl border-b-2 border-black pb-2 mb-2">
            나의 신체 정보
          </p>
          <BodyInput
            name="키"
            id="height"
            placeholder=""
            unit="cm"
            value={bodyData.height}
            onChange={inputChange}
          />
          <BodyInput
            name="몸무게"
            id="weight"
            placeholder=""
            unit="kg"
            value={bodyData.weight}
            onChange={inputChange}
          />
          <BodyInput
            name="골격근량"
            id="muscle"
            placeholder=""
            unit="kg"
            value={bodyData.muscle}
            onChange={inputChange}
          />
          <BodyInput
            name="체지방률"
            id="bodyFat"
            placeholder=""
            unit="%"
            value={bodyData.bodyFat}
            onChange={inputChange}
          />
          <button
            onClick={saveLogic}
            className="font-bold border-2 border-black rounded-lg w-full mt-4 py-2 md:text-base"
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

      <button
        onClick={() => setShowChartModal(true)}
        className="fixed bottom-20 right-4 px-5 py-3 bg-cyan-500 text-black rounded z-50"
      >
        내 몸의 변화보기
      </button>

      {showChartModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-[90%] max-w-5xl pt-[50px] pr-[20px] pb-[20px] rounded-lg relative">
            <button
              onClick={() => setShowChartModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
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