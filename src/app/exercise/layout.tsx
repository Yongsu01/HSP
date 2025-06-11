import Background from "../components/Background";
import HeaderProfile from "../components/HeaderProfile";

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <Background>
        <HeaderProfile/>
      {children}
    </Background>
  );
}
