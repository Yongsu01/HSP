import { ReactNode } from "react";
import Head from "next/head";
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
    <>
      <Head>
        <link 
        rel="stylesheet"
        href="https://unpkg.com/cropperjs/dist/cropper.min.css"
        />
      </Head>
      <Background>
        <HeaderCalender />
        {children}
      </Background>
    </>
  );
}
