"use client";
import Image from "next/image";

interface ProfileImageProps {
    viewImage : string;
    onClick: () => void;
}

export default function ProfileImage({ viewImage, onClick }: ProfileImageProps ) {

// 기존 코드 ProfileHistory components에 추가하여 옮김
//   const [showScreen, setShowScreen] = useState(false);

//   const imageInput = useRef<HTMLInputElement | null>(null);
//   const [viewImage, setViewImage] = useState<string>(currentImage);
//   const imageClick = () => {
//     imageInput.current?.click();
//   };

//   const imageClick = () => {
//     setShowScreen(true);
//   };

//   const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setViewImage(imageUrl); // 화면 업데이트
//       console.log("업로드 파일", file); // 제대로 출력되는지 확인용
//     }
//   };

  return (
    <div className="cursor-pointer relative w-full h-full" onClick={onClick}>
      <Image
        src={viewImage}
        fill // 부모(page.tsx) 크기 맞게 이미지 채우기
        style={{objectFit: "contain"}}
        alt="프로필 사진"
        className="rounded-lg"
        priority // 이미지 추가 시 경고가 계속 떠서 추가
      />
    </div>
  );
}
