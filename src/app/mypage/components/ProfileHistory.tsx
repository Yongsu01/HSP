"use client";
import { useRef, useState } from "react";
import Image from "next/image";

type historyProps = {
  onClose: () => void;
  onImageChange: (newImage: string) => void;
};

export default function ProfileHistory({ onClose, onImageChange }: historyProps) {
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUploadClick = () => {
    imageInput.current?.click();
  };

  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImages([...images, imageUrl]); // 화면 업데이트
      onImageChange(imageUrl);
      console.log("업로드 파일", file); // 제대로 출력되는지 확인용
    }
  };

  const prevImage = () => {
    if (images.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };
  const nextImage = () => {
    if (images.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md text-center relative">
      <button className="absolute top-3 right-4 text-2xl" onClick={onClose}>
        ✕
      </button>

      <div className="mt-8">
        {images.length > 0 ? (
          <Image
            src={images[currentIndex]}
            alt="이전 프로필 이미지"
            width={300}
            height={300}
            className="mx-auto rounded-lg object-contain"
          />
        ) : (
          <p className="text-gray-500 text-sm">이전 이미지가 없습니다.</p>
        )}
      </div>

      <div className="flex justify-between items-center mt-4 px-4">
        <button
          onClick={prevImage}
          className="text-lg px-4 py-1 rounded hover:bg-gray-200"
        >
          ←
        </button>

        <button
          onClick={handleUploadClick}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          사진 변경
        </button>

        <button
          onClick={nextImage}
          className="text-lg px-4 py-1 rounded hover:bg-gray-200"
        >
          →
        </button>
      </div>

      <input
        className="hidden"
        type="file"
        accept="image/*"
        ref={imageInput}
        onChange={imageChange}
      />
    </div>
  </div>
  );
}
