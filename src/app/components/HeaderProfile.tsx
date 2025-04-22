import Image from "next/image";
import FitU from "../../../public/FITULOGO 2.png";
import FitUChar from "../../../public/FITUChar.svg";
import PerSonIcon from "../../../public/PersonIcon.svg"

export default function HeaderProfile() {
  return (
      <div className="w-full flex justify-between items-start pr-[15px] px-[15px]">
        <Image src={FitU} alt="FitU logo" className=" w-[40px] h-[40px]" />
        <Image src={FitUChar} alt="FITU" />
        <Image src={PerSonIcon} alt="Calendar icon" className=" w-[40px] h-[40px]" />
      </div>
  );
}
