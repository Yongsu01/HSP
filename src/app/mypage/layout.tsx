import { ReactNode } from "react";
import Background from "../components/Background";
import "@/app/globals.css";

export const metadata = {
  title: "Mypage",
};

interface RLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }:RLayoutProps) { // children readonly 추가하기
  return (
      <html>
        <body>{children}</body>
      </html>
  );
}
