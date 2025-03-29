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


// export default function Home() {
//   return (
//     <div className="h-[100%] w-[250px] min-w-[150px] max-w-[100%] text-center flex flex-col">
//       <div className="text-[#FFFFFF] text-[28px] pt-[30px] font-semibold ">
//         추가정보 입력
//       </div>
//       <div className="flex flex-col pt-[30px] gap-[15px]">
//         <div className="flex flex-col text-start gap-[10px]">
//           <p className="text-white text-[17px] ">키</p>
//           <div className=" bg-white items-center h-[40px] justify-center text-[#777676] flex felx-row">
//             <input className=" h-[100%] outline-none text-black w-[30px] max-w-[100px] font-semibold"></input>
//             <div>cm</div>
//           </div>
//         </div>

//         <div className="flex flex-col text-start gap-[10px]">
//           <p className="text-white text-[17px] ">성별</p>
//           <div className="w-full flex h-[40px]">
//             <div className=" w-full text-center flex flex-row">
//               <input
//                 type="radio"
//                 id="male"
//                 name="sex"
//                 value="MALE"
//                 className="hidden"
//               />
//               <label
//                 htmlFor="male"
//                 className="flex justify-center items-center h-[100%] w-full bg-white px-2 cursor-pointer transition-all border border-black/40 text-center hover:bg-[#E45258] hover:text-white checked:bg-[#E45258] checked:text-white"
//               >
//                 남자
//               </label>
//             </div>
//             <div className=" w-full text-center">
//               <input
//                 type="radio"
//                 id="female"
//                 name="sex"
//                 value="FEMALE"
//                 className="hidden"
//               />
//               <label
//                 htmlFor="female"
//                 className="flex justify-center items-center h-[100%] px-2 bg-white cursor-pointer transition-all border border-black/40 text-center hover:bg-[#E45258] hover:text-white checked:bg-[#E45258] checked:text-white"
//               >
//                 여자
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
