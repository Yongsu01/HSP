import Image from "next/image";
import FitU from "../../../public/FITULOGO.svg";
import FitUChar from "../../../public/FITUChar.svg";
import Profile from "../../../public/anonymous_profile_image.svg";
import { ReactNode } from "react";

interface HeaderProfileProps {
  children: ReactNode;
}

export default function HeaderProfile({ children }: HeaderProfileProps) {
  return (
    <div>
      <div className="w-full h-[10%] bg-[#4B4B4B] flex justify-between items-start px-10 py-20">
        <Image src={FitU} alt="FitU logo" />
        <Image src={FitUChar} alt="FITU" />
        <Image src={Profile} alt="Calendar icon" className="pt-2" />
      </div>
      {children}
    </div>
  );
}
