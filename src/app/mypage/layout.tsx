import { ReactNode } from "react";
import "@/app/globals.css";
import HeaderCalender from "../components/HeaderCalender";

export const metadata = {
  title: "Mypage",
};

interface RLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RLayoutProps) {
  return (
    <html>
      <body>
        <HeaderCalender>{children}</HeaderCalender>
      </body>
    </html>
  );
}
