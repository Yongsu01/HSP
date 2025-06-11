import React from "react";

type ProfileImageProps = {
  viewImage: string;
  onClick: () => void;
};

export default function ProfileImage({ viewImage, onClick }: ProfileImageProps) {
  return (
    <div onClick={onClick} className="relative w-[200px] h-[200px] rounded-full overflow-hidden cursor-pointer">
      <img src={viewImage} alt="프로필 이미지" className="w-full h-full object-cover rounded-full"
      />
    </div>
  );
}