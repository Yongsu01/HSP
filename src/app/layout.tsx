import type { Metadata } from "next";
import "@/app/globals.css"; 

export const metadata: Metadata = {
  title: "FitU",
  description: "Generated by HSP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
