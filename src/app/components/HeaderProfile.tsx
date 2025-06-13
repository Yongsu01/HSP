"use client"
import Image from "next/image";
import FitU from "../../../public/FITULOGO 2.png";
import FitUChar from "../../../public/FITUChar.svg";
import PerSonIcon from "../../../public/PersonIcon.svg"
import { useRouter } from "next/navigation";

export default function HeaderProfile() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-between items-start pr-[15px] px-[15px]">
      <Image src={FitU} alt="FitU logo" className=" w-[40px] h-[40px]" onClick={()=>router.push('/mainpage')}/>
      <Image src={FitUChar} alt="FITU" onClick={()=>router.push('/mainpage')}/>
      <Image src={PerSonIcon} alt="Person icon" className=" w-[40px] h-[40px]" onClick={(()=>router.push('/mypage'))} />
    </div>
  );
}
