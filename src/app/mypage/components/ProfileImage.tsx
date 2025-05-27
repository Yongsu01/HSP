"use client";
import Image from "next/image";

interface ProfileImageProps {
  viewImage: string;
  onClick: () => void;
}

export default function ProfileImage({ viewImage, onClick }: ProfileImageProps) {
  return (
    <div
      className="cursor-pointer w-[200px] h-[200px] relative"
      onClick={onClick}
    >
      <Image
        src={viewImage}
        alt="프로필 사진"
        width={200}
        height={200}
        className="rounded-lg object-cover w-full h-full"
        priority
      />
    </div>
  );
}
