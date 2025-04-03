"use client";
import KakaoLogin from "./moreinfo/components/KakaoLogin";

export default function Home() {
  return (
    <div className="h-[100%]">
      <div className="text-[#FFFFFF] text-[25px] underline pt-[120px] h-[100%] flex flex-col items-center justify-between">
        <div className="flex flex-col items-center gap-[30px]" >
          LOG IN
         <KakaoLogin/>
        </div>
        <div className=" text-[#C0C0C0] text-[17px] underline decoration-[#C0C0C0] pb-[30px]">
          헬린이를 위한 FitU
        </div>
      </div>
      </div>
  )
}
