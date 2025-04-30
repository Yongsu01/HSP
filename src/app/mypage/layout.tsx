import { ReactNode } from "react";
import "@/app/globals.css";
import HeaderCalender from "../components/HeaderCalender";
import Background from "../components/Background";

export const metadata = {
  title: "Mypage",
};

interface RLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RLayoutProps) {
  return (
    <Background>
      <HeaderCalender />
      {children}
    </Background>
  );
}
