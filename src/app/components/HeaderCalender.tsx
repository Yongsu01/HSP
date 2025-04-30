import Image from "next/image";
import FitU from "../../../public/FITULOGO 2.png";
import FitUChar from "../../../public/FITUChar.svg";
import Calender from "../../../public/Calendar.svg";

export default function HeaderCalender() {
  return (
    <div className="w-full flex justify-between items-start pr-[15px] px-[15px]">
      <Image src={FitU} alt="FitU logo" className=" w-[40px] h-[40px]" />
      <Image src={FitUChar} alt="FITU" />
      <Image src={Calender} alt="Calendar icon" className="w-[40px] h-[40px]" />
    </div>
  );
}
