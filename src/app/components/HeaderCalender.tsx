import Image from "next/image";
import FitU from "../../../public/FITULOGO.svg";
import FitUChar from "../../../public/FITUChar.svg";
import Calender from "../../../public/Calendar.svg";
import { ReactNode } from "react";

interface HeaderCalenderProps {
  children: ReactNode;
}

export default function HeaderCalender({ children }: HeaderCalenderProps) {
  return (
    <div>
      <div className="w-full h-[10%] bg-[#4B4B4B] flex justify-between items-start px-10 py-20">
        <Image src={FitU} alt="FitU logo" />
        <Image src={FitUChar} alt="FITU" />
        <Image src={Calender} alt="Calendar icon" className="pt-2" />
      </div>
      {children}
    </div>
  );
}
