import Background from "../components/Background";
import Image from "next/image";
import LOGO from "../../../public/FITU.svg";

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <Background>
      <Image src={LOGO} alt="LOGO" className=" h-[210px]"></Image>
      {children}
    </Background>
  );
}
