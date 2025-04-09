"use client";
import BodyInput from "./components/BodyInput";
import Image from "next/image";
import FitU from "../../../public/FITULOGO.svg";
import Calender from "../../../public/Calendar.svg";
import FitUChar from "../../../public/FITUChar.svg";
import Profile from "../../../public/anonymous_profile_image.svg";
import { useState } from "react";
// 해야하는 일 1. useState 할당해서 입력받는 값 저장
// 2. 성별 구분 불가한 익명 이미지 생성(마음에 안들어서 재생성중)
// 3. 프로필 클릭시 나오는 화면과 히스토리 -> 그 이후에 그래프 작업

export default function Home() {
  return (
    <div className="w-full h-screen bg-[#4B4B4B] items-center justify-center">
      {/* 기본 헤더 UI 부분 */}
      <div className="w-full h-[10%] flex justify-between items-start px-10 py-20">
        <Image src={FitU} alt="FitU logo" />
        <Image src={FitUChar} alt="FITU" />
        <Image src={Calender} alt="Calendar icon" className="pt-2" />
      </div>
      
      {/* 신체정보 입력과 프로필 사진 */}
      <div className="h-[35%] flex justify-between text-center">
        <div className="w-[40%] ml-10 border-2 border-solid border-black">
          <p className="h-[20%] pt-2 text-[#B3B3B3] text-2xl border-b-2 border-black">
            나의 신체 정보
          </p>
          <BodyInput name="키" id="height" placeholder="cm" />
          <BodyInput name="몸무게" id="weight" placeholder="kg" />
          <BodyInput name="골격근량" id="SMM" placeholder="kg" />
          <BodyInput name="체지방률" id="Body fat percentage" placeholder="%" />
        </div>
        <div className="w-[40%] aspect-[4/3] mr-10">
          <Image src={Profile} alt="임시사진" className="w-full h-full object-contain"></Image>
        </div>
      </div>
    </div>
  );
}
